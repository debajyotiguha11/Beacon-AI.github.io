export interface HierarchyItem {
    name: string;
    departments?: HierarchyItem[];
    categoryGroups?: HierarchyItem[];
    categories?: HierarchyItem[];
    subCategories?: HierarchyItem[];
}

type MarketData = {
    sbus: HierarchyItem[];
};

export const hierarchyData: Record<string, MarketData> = {
    "WM - US": {
        sbus: [
            { name: "FOOD" },
            { name: "CONSUMABLES" },
            {
                name: "HEALTH AND WELLNESS",
                departments: [
                    {
                        name: "D38 - PHARMACY RX",
                        categoryGroups: [
                            {
                                name: "CHRONIC",
                                categories: [
                                    {
                                        name: "DIABETES MELLITUS",
                                        subCategories: [
                                            { name: "DIABETIC BRAND" },
                                            { name: "DIABETIC GENERIC" },
                                            { name: "INSULIN BRAND" },
                                            { name: "INSULIN RELION" },
                                            { name: "OTC" },
                                            { name: "PEN NEEDLE BRAND" },
                                            { name: "PEN NEEDLE RELION" },
                                        ],
                                    },
                                    { name: "GASTROINTESTINAL HEALTH" },
                                    { name: "PAIN MANAGEMENT" },
                                    { name: "RX MISCELLANEOUS" },
                                    { name: "SKIN HEALTH" },
                                ],
                            },
                            { name: "DEPT LEVEL SALES" },
                            { name: "PET RX L2" },
                            { name: "PHARMACY RX L2" },
                            { name: "RX MISC" },
                            { name: "SEASONAL GENDER" },
                            { name: "SPECIALTY" },
                            { name: "WELLNESS" },
                        ],
                    },
                    { name: "D49 - OPTICAL" },
                    { name: "D50 - OPTICAL SERVICES" },
                    { name: "D75 - NOT IN USE" },
                ],
            },
        ],
    },
    "Sam's - US": {
        sbus: [
            { name: "SAMS FOOD" },
            { name: "SAMS WELLNESS" },
        ],
    },
    "WM - Canada": {
        sbus: [
            { name: "CA FOOD" },
            { name: "CA GENERAL MERCH" },
        ],
    },
};
