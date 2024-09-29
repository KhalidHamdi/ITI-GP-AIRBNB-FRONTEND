
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios';
import PropertyListItem from '../property/PropertyListItem';

const MyFavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axiosInstance.get('/api/favorite/');
                setFavorites(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch favorites:', error);
                setLoading(false);
            }
        };

        fetchFavorites();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-4">
            <h1 className="mb-4">My Favorites</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {favorites.length > 0 ? (
                    favorites.map(favorite => (
                        <div key={favorite.id} className="col">
                            <PropertyListItem property={favorite.property} />
                        </div>
                    ))
                ) : (
                    <div>No favorite properties found.</div>
                )}
            </div>
        </div>
    );
};

export default MyFavoritesPage;
