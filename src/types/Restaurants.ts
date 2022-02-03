export interface IRestaurant {
    name: string,
    id: number
}

export type AddRestaurantType = Omit<IRestaurant,'id'>

export type RestaurantsAPIType = {
    getRestaurants: () => Promise<IRestaurant[]>,
    addRestaurant: (values: AddRestaurantType) => Promise<IRestaurant>
}

export interface RestaurantsInitialState {
    loadingInProgress: boolean,
    restaurants: IRestaurant[]
}

export type RestaurantCloseModalType = 'add' | 'filter' | 'edit';
