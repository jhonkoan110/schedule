import * as locationsRepository from '../repositories/locations.repository';


// Получить все локации
export const getLocations = async () => {
    const locations = await locationsRepository.getLocations();
    return locations;
}