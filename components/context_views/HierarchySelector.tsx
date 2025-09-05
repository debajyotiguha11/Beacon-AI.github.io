import React, { useState, useMemo } from 'react';
import { hierarchyData, HierarchyItem } from './hierarchyData';

interface HierarchySelectorProps {
    onApply: (selection: string) => void;
    onCancel: () => void;
}

const Column: React.FC<{
    title: string;
    items: HierarchyItem[];
    selectedPathItem: string | null;
    checkedItems: Set<string>;
    onItemClick: (item: HierarchyItem) => void;
    onCheckboxChange: (itemName: string) => void;
    onSelectAll: (items: HierarchyItem[]) => void;
    parentName: string | null;
}> = ({ title, items, selectedPathItem, checkedItems, onItemClick, onCheckboxChange, onSelectAll, parentName }) => {
    
    const checkedCount = items.filter(i => checkedItems.has(i.name)).length;
    const allChecked = items.length > 0 && checkedCount === items.length;

    return (
        <div className="flex-1 border-r border-slate-200 flex flex-col min-w-[220px] last:border-r-0">
            <div className="p-2 bg-slate-100 border-b border-slate-200 flex-shrink-0">
                <label className="flex items-center text-xs font-bold text-slate-600">
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-walmart-blue focus:ring-walmart-blue mr-2"
                        onChange={() => onSelectAll(items)}
                        checked={allChecked}
                    />
                    {title.replace('{X}', checkedCount.toString()).replace('{Y}', items.length.toString())}
                </label>
            </div>
            {parentName && (
                <div className="p-2 border-b border-slate-200 bg-white flex-shrink-0">
                    <span className="text-xs font-bold text-slate-800">
                        {parentName.toUpperCase()} ({checkedCount} of {items.length})
                    </span>
                </div>
            )}
            <ul className="flex-grow overflow-y-auto">
                {items.map(item => (
                    <li key={item.name}>
                        <div className={`flex items-center text-sm border-b border-slate-200 ${selectedPathItem === item.name ? 'bg-blue-100' : 'hover:bg-slate-50'}`}>
                            <label className="flex items-center p-2 w-full cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-300 text-walmart-blue focus:ring-walmart-blue mr-2"
                                    checked={checkedItems.has(item.name)}
                                    onChange={() => onCheckboxChange(item.name)}
                                />
                                <span
                                    className={`flex-grow text-slate-800 ${selectedPathItem === item.name ? 'font-semibold' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onItemClick(item);
                                    }}
                                >
                                    {item.name}
                                </span>
                            </label>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export const HierarchySelector: React.FC<HierarchySelectorProps> = ({ onApply, onCancel }) => {
    const [activeTab, setActiveTab] = useState<keyof typeof hierarchyData>('WM - US');
    const [selectionPath, setSelectionPath] = useState<Record<string, string | null>>({
        sbu: null,
        dept: null,
        group: null,
        cat: null,
        subCat: null,
    });
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const currentData = hierarchyData[activeTab];

    const handleItemClick = (level: string, item: HierarchyItem) => {
        const newPath: Record<string, string | null> = {};
        if (level === 'sbu') {
            newPath.sbu = item.name;
            newPath.dept = null;
            newPath.group = null;
            newPath.cat = null;
            newPath.subCat = null;
        } else if (level === 'dept') {
            newPath.sbu = selectionPath.sbu;
            newPath.dept = item.name;
            newPath.group = null;
            newPath.cat = null;
            newPath.subCat = null;
        } else if (level === 'group') {
            newPath.sbu = selectionPath.sbu;
            newPath.dept = selectionPath.dept;
            newPath.group = item.name;
            newPath.cat = null;
            newPath.subCat = null;
        } else if (level === 'cat') {
            newPath.sbu = selectionPath.sbu;
            newPath.dept = selectionPath.dept;
            newPath.group = selectionPath.group;
            newPath.cat = item.name;
            newPath.subCat = null;
        }
        setSelectionPath(newPath);
    };

    const handleCheckboxChange = (itemName: string) => {
        setCheckedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemName)) {
                newSet.delete(itemName);
            } else {
                newSet.add(itemName);
            }
            return newSet;
        });
    };
    
    const handleSelectAll = (itemsToToggle: HierarchyItem[]) => {
        const itemNames = itemsToToggle.map(i => i.name);
        const allCurrentlyChecked = itemNames.every(name => checkedItems.has(name));
        
        setCheckedItems(prev => {
            const newSet = new Set(prev);
            if (allCurrentlyChecked) {
                itemNames.forEach(name => newSet.delete(name));
            } else {
                itemNames.forEach(name => newSet.add(name));
            }
            return newSet;
        });
    };
    
    const handleApplyClick = () => {
        if (checkedItems.size === 0) {
            onApply('No selection');
        } else {
            onApply(Array.from(checkedItems).join(', '));
        }
    };


    const { depts, groups, cats, subCats } = useMemo(() => {
        const selectedSbu = currentData.sbus.find(s => s.name === selectionPath.sbu);
        const selectedDept = selectedSbu?.departments?.find(d => d.name === selectionPath.dept);
        const selectedGroup = selectedDept?.categoryGroups?.find(g => g.name === selectionPath.group);
        const selectedCat = selectedGroup?.categories?.find(c => c.name === selectionPath.cat);
        return {
            depts: selectedSbu?.departments || [],
            groups: selectedDept?.categoryGroups || [],
            cats: selectedGroup?.categories || [],
            subCats: selectedCat?.subCategories || [],
        };
    }, [selectionPath, currentData]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[70vh] flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <h2 className="text-xl font-semibold text-slate-800">Hierarchy Selector</h2>
                </div>

                <div className="border-b border-slate-200 px-4">
                    <nav className="-mb-px flex space-x-6">
                        {Object.keys(hierarchyData).map(tabName => (
                            <button
                                key={tabName}
                                onClick={() => setActiveTab(tabName as keyof typeof hierarchyData)}
                                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === tabName ? 'border-walmart-blue text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                            >
                                {tabName}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex-grow flex overflow-x-auto">
                    <Column
                        title="SBUs ({X} of {Y})"
                        items={currentData.sbus}
                        selectedPathItem={selectionPath.sbu}
                        checkedItems={checkedItems}
                        onItemClick={(item) => handleItemClick('sbu', item)}
                        onCheckboxChange={handleCheckboxChange}
                        onSelectAll={handleSelectAll}
                        parentName={null}
                    />
                    {selectionPath.sbu && depts.length > 0 && <Column
                        title="Departments ({X} of {Y})"
                        items={depts}
                        selectedPathItem={selectionPath.dept}
                        checkedItems={checkedItems}
                        onItemClick={(item) => handleItemClick('dept', item)}
                        onCheckboxChange={handleCheckboxChange}
                        onSelectAll={handleSelectAll}
                        parentName={selectionPath.sbu}
                    />}
                    {selectionPath.dept && groups.length > 0 && <Column
                        title="Category Groups ({X} of {Y})"
                        items={groups}
                        selectedPathItem={selectionPath.group}
                        checkedItems={checkedItems}
                        onItemClick={(item) => handleItemClick('group', item)}
                        onCheckboxChange={handleCheckboxChange}
                        onSelectAll={handleSelectAll}
                        parentName={selectionPath.dept}
                    />}
                    {selectionPath.group && cats.length > 0 && <Column
                        title="Category ({X} of {Y})"
                        items={cats}
                        selectedPathItem={selectionPath.cat}
                        checkedItems={checkedItems}
                        onItemClick={(item) => handleItemClick('cat', item)}
                        onCheckboxChange={handleCheckboxChange}
                        onSelectAll={handleSelectAll}
                        parentName={selectionPath.group}
                    />}
                    {selectionPath.cat && subCats.length > 0 && <Column
                        title="Sub Category ({X} of {Y})"
                        items={subCats}
                        selectedPathItem={selectionPath.subCat}
                        checkedItems={checkedItems}
                        onItemClick={(item) => { /* no children */ }}
                        onCheckboxChange={handleCheckboxChange}
                        onSelectAll={handleSelectAll}
                        parentName={selectionPath.cat}
                    />}
                </div>

                <div className="flex justify-end items-center p-4 border-t border-slate-200 bg-slate-50">
                    <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-walmart-blue">
                        Cancel
                    </button>
                    <button onClick={handleApplyClick} className="ml-3 px-4 py-2 text-sm font-medium text-white bg-walmart-blue border border-transparent rounded-md shadow-sm hover:bg-walmart-darkblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-walmart-blue">
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};