export type SupplementalRelationalData<Services extends { belongsToMany: any }> = {
    _belongsToMany: {
        [key in Services['belongsToMany']]: Services['belongsToMany'][key][];
    }
};