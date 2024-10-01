// // src/components/property/useFavorites.jsx

// import { useState, useEffect, useCallback } from "react";
// import axiosInstance from "../../axios";
// import Cookies from "js-cookie";

// const useFavorites = (propertyId) => {
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const checkFavoriteStatus = useCallback(async () => {
//         const token = Cookies.get('authToken');
//         if (!token) return;

//         try {
//             const response = await axiosInstance.get("/api/favorite/");
//             const favorites = response.data;
//             const favStatus = favorites.some((fav) => fav.property.id === propertyId);
//             setIsFavorite(favStatus);
//         } catch (error) {
//             console.error("Error checking favorite status", error);
//         }
//     }, [propertyId]);

//     useEffect(() => {
//         checkFavoriteStatus();
//     }, [checkFavoriteStatus]);

//     const toggleFavorite = async () => {
//         const token = Cookies.get('authToken');
//         if (!token) {
//             alert("Please log in to toggle favorite.");
//             return;
//         }

//         setLoading(true);
//         try {
//             const method = isFavorite ? 'DELETE' : 'POST';
//             const url = isFavorite ? `/api/favorite/remove/${propertyId}/` : `/api/favorite/add/${propertyId}/`;
//             await axiosInstance({ method, url });
//             setIsFavorite((prev) => !prev);
//         } catch (error) {
//             console.error("Error toggling favorite", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { isFavorite, loading, toggleFavorite };
// };

// export default useFavorites;
