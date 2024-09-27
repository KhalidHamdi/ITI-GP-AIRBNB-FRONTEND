import React from 'react';

const Categories = ({ dataCategory, setCategory }) => {
    const categoryData = [
        {
            "imageUrl": "https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg",
            "title": "Amazing pools",
            "value": "amazing_pools"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/aaa02c2d-9f0d-4c41-878a-68c12ec6c6bd.jpg",
            "title": "Farms",
            "value": "farms"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg",
            "title": "Treehouses",
            "value": "treehouses"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg",
            "title": "Islands",
            "value": "islands"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/7630c83f-96a8-4232-9a10-0398661e2e6f.jpg",
            "title": "Rooms",
            "value": "rooms"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/a6dd2bae-5fd0-4b28-b123-206783b5de1d.jpg",
            "title": "Desert",
            "value": "desert"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg",
            "title": "Luxe",
            "value": "luxe"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg",
            "title": "Beach",
            "value": "beach"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/c9157d0a-98fe-4516-af81-44022118fbc7.jpg",
            "title": "Dammusi",
            "value": "dammusi"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg",
            "title": "A-frames",
            "value": "a_frames"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg",
            "title": "Off-the-grid",
            "value": "off_the_grid"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg",
            "title": "Camping",
            "value": "camping"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg",
            "title": "Design",
            "value": "design"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/33848f9e-8dd6-4777-b905-ed38342bacb9.jpg",
            "title": "Trulli",
            "value": "trulli"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg",
            "title": "Trending",
            "value": "trending"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/d7445031-62c4-46d0-91c3-4f29f9790f7a.jpg",
            "title": "Earth homes",
            "value": "earth_homes"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg",
            "title": "Amazing views",
            "value": "amazing_views"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg",
            "title": "Top of the world",
            "value": "top_of_the_world"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg",
            "title": "National parks",
            "value": "national_parks"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg",
            "title": "Cabins",
            "value": "cabins"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg",
            "title": "Countryside",
            "value": "countryside"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/ed8b9e47-609b-44c2-9768-33e6a22eccb2.jpg",
            "title": "Iconic cities",
            "value": "iconic_cities"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg",
            "title": "Lake",
            "value": "lake"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg",
            "title": "Lakefront",
            "value": "lakefront"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg",
            "title": "Tiny homes",
            "value": "tiny_homes"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg",
            "title": "OMG!",
            "value": "omg"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg",
            "title": "Tropical",
            "value": "tropical"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/957f8022-dfd7-426c-99fd-77ed792f6d7a.jpg",
            "title": "Surfing",
            "value": "surfing"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg",
            "title": "Beachfront",
            "value": "beachfront"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg",
            "title": "Castles",
            "value": "castles"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg",
            "title": "Play",
            "value": "play"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/31c1d523-cc46-45b3-957a-da76c30c85f9.jpg",
            "title": "Camper vans",
            "value": "camper_vans"
        },
        {
            "imageUrl": "https://a0.muscache.com/pictures/8b8b36e4-b4e1-471e-82d5-1a2f48ac0a2e.jpg",
            "title": "Historical homes",
            "value": "historical_homes"
        }
    ];
    return (
        <div
            className="row g-3 overflow-auto" 
            style={{ maxHeight: '750px' }} 
        >
            {categoryData.map((category, index) => (
                <div
                    key={category.value}
                    className="col-12 col-sm-6 col-md-4 d-flex justify-content-center" 
                >
                    <div
                        onClick={() => setCategory(category.value)}
                        className={`text-center p-3 category-item d-flex flex-column align-items-center justify-content-center rounded ${dataCategory === category.value ? 'border border-dark' : 'border border-light'} opacity-75`}
                        style={{ cursor: 'pointer', transition: 'all 0.3s', width: '150px', height: '150px' }} 
                    >
                        <img
                            src={category.imageUrl}
                            alt={`Category - ${category.title}`}
                            className="mb-2"
                            width={50} 
                            height={50}
                        />
                        <span className="text-muted">{category.title}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}    
export default Categories;
