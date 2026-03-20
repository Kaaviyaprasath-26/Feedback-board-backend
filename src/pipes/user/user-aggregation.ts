export const UserCommenAggregation = [
    {
        $project: {
            name: 1,
            email: 1,
            country_code:1,
            cell_no: 1,
            DOB: 1,
            role: 1,
            createdAt: 1,
            updatedAt: 1,
        },
    },
    {
        $sort: {
            name: -1 as const
        }
    }
];