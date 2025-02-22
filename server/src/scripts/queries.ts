import { Neogma, QueryBuilder } from "neogma";

/**
 * 
 * @param name 
 * @param neogma 
 * @returns Node[]
 */
export const queryRelationships = (name: string, neogma: Neogma) => {
    return new QueryBuilder()
        .match({
            related: [
                {
                    identifier: 'u',
                    label: 'User',
                    where: { name: name }
                },
                {
                    identifier: 'r',
                    direction: 'out'
                },
                {
                    identifier: 'n'
                }
            ]
        })
        .return('n')
        .run();
}

/**
 * 
 * @param category 
 * @param neogma 
 * @returns Node[]
 */
export const queryUsers = (category: string, neogma: Neogma) => {
    return new QueryBuilder()
        .match({
            related: [
                {
                    identifier: 'u',
                    label: 'User',
                },
                {
                    identifier: 'r',
                    direction: 'out',
                    name: 'LikesCategory',
                },
                {
                    identifier: 'c',
                    label: 'Category',
                    where: { name: category },
                },
            ],
        })
        .return('u')
        .run();
}