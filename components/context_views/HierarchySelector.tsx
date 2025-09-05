import React, { useState, useMemo } from 'react';
import { hierarchyData, HierarchyItem } from './hierarchyData';

interface HierarchySelectorProps {
    onApply: (selection: string) => void;
    onCancel: () => void;
}

export const HierarchySelector: React.FC<HierarchySelectorProps> = ({ onApply, onCancel }) => {
    const [activeTab, setActiveTab] = useState<keyof typeof hierarchyData>('WM - US');
    const [selectionPath, setSelectionPath] = useState<Record<string, string | null>>({
        sbu: null, dept: null, group: null, cat: null, subCat: null,
    });
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

    const currentData = hierarchyData[activeTab];

    const handleItemClick = (level: string, item: HierarchyItem) => {
        const newPath: Record<string, string | null> = { ...selectionPath };
        const levels = ['sbu', 'dept', 'group', 'cat', 'subCat'];
        const currentLevelIndex = levels.indexOf(level);

        // If the same item is clicked, do nothing to prevent re-renders
        if (newPath[level] === item.name) return;

        newPath[level] = item.name;

        // Reset all subsequent levels in the path
        for (let i = currentLevelIndex + 1; i < levels.length; i++) {
            newPath[levels[i]] = null;
        }
        
        setSelectionPath(newPath);
    };

    const handleCheckboxChange = (itemName: string) => {
        setCheckedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(itemName)) newSet.delete(itemName);
            else newSet.add(itemName);
            return newSet;
        });
    };
    
    const handleSelectAll = (itemsToToggle: HierarchyItem[]) => {
        if (!itemsToToggle || itemsToToggle.length === 0) return;
        const itemNames = itemsToToggle.map(i => i.name);
        const allCurrentlyChecked = itemNames.every(name => checkedItems.has(name));
        
        setCheckedItems(prev => {
            const newSet = new Set(prev);
            if (allCurrentlyChecked) itemNames.forEach(name => newSet.delete(name));
            else itemNames.forEach(name => newSet.add(name));
            return newSet;
        });
    };
    
    const handleApplyClick = () => {
        onApply(checkedItems.size > 0 ? Array.from(checkedItems).join(', ') : 'No selection');
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

    const columns = [
        { level: 'sbu', title: 'SBUs ({X} of {Y})', items: currentData.sbus, parentName: null, show: true },
        { level: 'dept', title: 'Departments ({X} of {Y})', items: depts, parentName: selectionPath.sbu, show: selectionPath.sbu !== null },
        { level: 'group', title: 'Category Groups ({X} of {Y})', items: groups, parentName: selectionPath.dept, show: selectionPath.dept !== null },
        { level: 'cat', title: 'Category ({X} of {Y})', items: cats, parentName: selectionPath.group, show: selectionPath.group !== null },
        { level: 'subCat', title: 'Sub Category ({X} of {Y})', items: subCats, parentName: selectionPath.cat, show: selectionPath.cat !== null },
    ];

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
                                onClick={() => {
                                    setActiveTab(tabName as keyof typeof hierarchyData);
                                    setSelectionPath({ sbu: null, dept: null, group: null, cat: null, subCat: null });
                                    setCheckedItems(new Set());
                                }}
                                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === tabName ? 'border-walmart-blue text-slate-800' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
                            >
                                {tabName}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex-grow flex flex-col overflow-hidden">
                    <div className="flex bg-slate-100 border-b border-slate-200 flex-shrink-0">
                        {columns.map(col => {
                            const items = col.show ? col.items : [];
                            const checkedCount = items.filter(i => checkedItems.has(i.name)).length;
                            return (
                                <div key={col.level} className="flex-1 p-2 border-r border-slate-200 min-w-[220px] last:border-r-0">
                                    <label className={`flex items-center text-xs font-bold ${col.show ? 'text-slate-600' : 'text-slate-400'}`}>
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-300 text-walmart-blue focus:ring-walmart-blue mr-2"
                                            onChange={() => handleSelectAll(items)}
                                            checked={col.show && items.length > 0 && checkedCount === items.length}
                                            disabled={!col.show}
                                        />
                                        {col.title.replace('{X}', checkedCount.toString()).replace('{Y}', items.length.toString())}
                                    </label>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex-grow flex overflow-x-auto">
                        {columns.map(col => (
                            <div key={col.level} className="flex-1 border-r border-slate-200 flex flex-col min-w-[220px] last:border-r-0">
                                {col.show && (
                                    <>
                                        {col.parentName && (
                                            <div className="p-2 border-b border-slate-200 bg-white flex-shrink-0">
                                                <span className="text-xs font-bold text-slate-800">
                                                    {col.parentName.toUpperCase()} ({col.items.filter(i => checkedItems.has(i.name)).length} of {col.items.length})
                                                </span>
                                            </div>
                                        )}
                                        <ul className="flex-grow overflow-y-auto">
                                            {col.items.map(item => (
                                                <li key={item.name}>
                                                    <div className={`flex items-center text-sm border-b border-slate-200 ${selectionPath[col.level] === item.name ? 'bg-blue-100' : 'hover:bg-slate-50'}`}>
                                                        <label className="flex items-center p-2 w-full cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="h-4 w-4 rounded border-slate-300 text-walmart-blue focus:ring-walmart-blue mr-2"
                                                                checked={checkedItems.has(item.name)}
                                                                onChange={() => handleCheckboxChange(item.name)}
                                                            />
                                                            <span
                                                                className={`flex-grow text-slate-800 ${selectionPath[col.level] === item.name ? 'font-semibold' : ''}`}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    handleItemClick(col.level, item);
                                                                }}
                                                            >
                                                                {item.name}
                                                            </span>
                                                        </label>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
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