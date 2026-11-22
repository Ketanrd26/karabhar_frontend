import { RxStarFilled } from "react-icons/rx";




export const productCategory = [
    { id: 1, name: "Chemical Free" },
    { id: 2, name: "Craft" },
    { id: 3, name: "Food" },
    { id: 4, name: "Crops" },
    { id: 5, name: "Healthy" },
    { id: 6, name: "Spiritual" },
    { id: 7, name: "Cultural" },
    { id: 8, name: "Fashion" },
    { id: 9, name: "Eco Friendly" },
     { id: 10, name: "Go Shala" },
];


export const categories = [
    {
        name: "Women Ethnic",
        subcategories: [
            { name: "Sarees", children: ["Silk Sarees", "Banarasi Silk Sarees", "Cotton Sarees", "Georgette Sarees", "Chiffon Sarees", "Heavy Work Sarees", "Net Sarees"] },
            { name: "Kurtis", children: ["Anarkali Kurtis", "Rayon Kurtis", "Cotton Kurtis", "Chikankari Kurtis"] },
            { name: "Kurta Sets", children: ["Kurta Palazzo Sets", "Rayon Kurta Sets", "Kurta Pant Sets", "Cotton Kurta Sets", "Sharara Sets"] },
            { name: "Dupatta Sets", children: ["Cotton Sets", "Rayon Sets", "Printed Sets"] },
            { name: "Suits & Dress Material", children: ["Cotton Suits", "Embroidered Suits", "Crepe Suits", "Silk Suits", "Patiala Suits"] },
            { name: "Lehengas", children: ["Lehenga Cholis", "Net Lehenga", "Bridal Lehenga"] },
            { name: "Other Ethnic", children: ["Blouses", "Dupattas", "Lehanga", "Gown", "Skirts & Bottomwear", "Islamic Fashion", "Petticoats"] }
        ]
    },
    {
        name: "Women Western",
        subcategories: [
            { name: "Tops", children: ["Crop Tops", "Tank Tops", "Blouses", "Shirts"] },
            { name: "Dresses", children: ["Bodycon Dresses", "A-Line Dresses", "Maxi Dresses", "Mini Dresses"] },
            { name: "Bottomwear", children: ["Jeans", "Trousers", "Skirts", "Shorts", "Jeggings"] },
            {
                name: "Innerwear", children: ["Bra", "Women Innerwear", "Briefs"]
            },
            { name: "Sleepwear", children: ["Nightsuits", "Women Nightdress"] },
        ]
    },
    {
        name: "Men",
        subcategories: [
            { name: "Topwear", children: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Sweatshirts", "Hoodies"] },
            { name: "Bottomwear", children: ["Jeans", "Trousers", "Shorts", "Track Pants"] },
            { name: "Ethnic Wear", children: ["Kurtas", "Sherwanis", "Nehru Jackets", "Dhotis"] },
            { name: "Innerwear", children: ["Vests", "Briefs", "Boxers"] },
            { name: "Sleepwear", children: ["Pyjamas", "Lounge Pants"] }
        ]
    },
    {
        name: "Kids",
        subcategories: [
            { name: "Boys Clothing", children: ["T-Shirts", "Shirts", "Jeans", "Shorts", "Ethnic Wear"] },
            { name: "Girls Clothing", children: ["Frocks", "Dresses", "Tops", "Ethnic Wear", "Jeans"] },
            { name: "Infant Wear", children: ["Bodysuits", "Onesies", "Sleep Suits"] },
            { name: "School Supplies", children: ["Bags", "Water Bottles", "Lunch Boxes"] }
        ]
    },
    {
        name: "Home & Kitchen",
        subcategories: [
            { name: "Kitchenware", children: ["Cookware", "Gas Stoves", "Dinner Sets", "Storage Jars"] },
            { name: "Home Decor", children: ["Clocks", "Photo Frames", "Wall Stickers", "Candles", "Decorative String Lights"] },
            { name: "Furniture", children: ["Sofas", "Tables", "Chairs", "Storage"] },
            { name: "Furnishings", children: ["Bedsheets", "Curtains", "Pillows", "Carpets"] }
        ]
    },
    {
        name: "Beauty & Health",
        subcategories: [
            { name: "Makeup", children: ["Lipsticks", "Foundations", "Mascaras", "Kajal"] },
            { name: "Skincare", children: ["Face Wash", "Moisturizers", "Sunscreen"] },
            { name: "Haircare", children: ["Shampoo", "Conditioner", "Hair Oils"] },
            { name: "Healthcare", children: ["Supplements", "Ayurvedic", "Personal Care"] }
        ]
    },
    {
        name: "Jewellery & Accessories",
        subcategories: [
            { name: "Jewellery", children: ["Earrings", "Necklaces", "Rings", "Bangles"] },
            { name: "Watches", children: ["Men's Watches", "Women's Watches"] },
            { name: "Bags", children: ["Handbags", "Clutches", "Backpacks", "Trolley Bags"] },
            { name: "Accessories", children: ["Belts", "Caps", "Scarves", "Sunglasses"] }
        ]
    },
    {
        name: "Bags & Footwear",
        subcategories: [
            { name: "Women Footwear", children: ["Flats", "Heels", "Sandals", "Casual Shoes"] },
            { name: "Men Footwear", children: ["Casual Shoes", "Formal Shoes", "Sports Shoes", "Sandals"] },
            { name: "Kids Footwear", children: ["School Shoes", "Sandals", "Booties"] }
        ]
    },
    {
        name: "Electronics",
        subcategories: [
            { name: "Mobiles", children: ["Smartphones", "Feature Phones"] },
            { name: "Laptops", children: ["Gaming Laptops", "Student Laptops"] },
            { name: "Accessories", children: ["Headphones", "Chargers", "Power Banks"] },
            { name: "Wearables", children: ["Smart Watches", "Fitness Bands"] }
        ]
    },
    {
        name: "Sports & Fitness",
        subcategories: [
            { name: "Sportswear", children: ["Active T-Shirts", "Tracksuits", "Shorts"] },
            { name: "Fitness Equipment", children: ["Dumbbells", "Yoga Mats", "Resistance Bands"] },
            { name: "Outdoor Sports", children: ["Cricket", "Football", "Badminton"] }
        ]
    },
    {
        name: "Car & Motorbike",
        subcategories: [
            { name: "Car Accessories", children: ["Seat Covers", "Car Perfume", "Tyre Inflators"] },
            { name: "Bike Accessories", children: ["Helmets", "Bike Covers", "Mobile Holders"] }
        ]
    },
    {
        name: "Office Supplies & Stationery",
        subcategories: [
            { name: "Office Essentials", children: ["Notebooks", "Pens", "Files", "Staplers"] },
            { name: "Stationery", children: ["Art Supplies", "Craft Items", "School Kits"] }
        ]
    },
    {
        name: "Pet Supplies",
        subcategories: [
            { name: "Dogs", children: ["Dog Food", "Toys", "Leashes", "Dog Beds"] },
            { name: "Cats", children: ["Cat Food", "Toys", "Litter Box"] },
            { name: "Birds & Others", children: ["Bird Food", "Cages", "Aquarium Supplies"] }
        ]
    },
    {
        name: "Food & Grocery",
        subcategories: [
            { name: "Fruits", children: ["Apples", "Bananas", "Grapes", "Mangoes"] },
            { name: "Staples", children: ["Rice", "Pulses", "Atta", "Sugar", "Salt"] },
            { name: "Dry Fruits", children: ["Almonds", "Cashews", "Raisins","Nuts"] },
            { name: "Snacks & Beverages", children: ["Chips", "Biscuits", "Soft Drinks", "Juices"] },
            { name: "Dairy Products", children: ["Milk", "Cheese", "Paneer", "Curd"] },
            { name: "Syrups", children: ["Dates Syrup"] },
            { name: "Mouth Freshner", children: ["Mukhvas"] },
            {
                name: "Spices",
                children: [
                    "Turmeric",
                    "Red Chilli Powder",
                    "Coriander Powder",
                    "Cumin",
                    "Garam Masala",
                    "Black Pepper",
                    "Cardamom",
                    "Cloves",
                    "Mutton Masala",
                    "Chicken Masala",
                    "Misal Masala"
                ]
            },
            {
                name: "Health & Wellness",
                children: [
                    "Chawanprash",
                    "Herbal Teas",
                    "Immunity Boosters",
                    "Digestive Aids"
                ]
            },
            {
                name: "Laddoos & Sweets",
                children: [
                    "Nachni Laddoo",
                    "Dinka Laddoo",
                    "Daraba Laddoo",
                    "Adiv Laddoo"
                ]
            },

        ]
    },
    {
        name: "Spiritual",
        subcategories: [
            { name: "Puja Essentials", children: ["Agarbatti", "Dhoop Sticks", "Camphor", "Cotton Wicks", "Puja Thali"] },
            { name: "Sacred Powders", children: ["Kumkum", "Haldi", "Chandan Powder", "Sindoor"] },
            { name: "Murti", children: ["Copper Murti", "Brass Murti", "Silver Murti", "Gold Murti", "Marble Murti", "Wooden Murti", "Clay Murti"] },
            { name: "Religious Idols", children: ["Lord Ganesha Idols", "Lord Krishna Idols", "Shivling", "Durga Maa Idols", "Hanuman Idols"] },
            { name: "Holy Books", children: ["Bhagavad Gita", "Ramayana", "Hanuman Chalisa", "Vishnu Sahasranama"] },
            { name: "Puja Decor", children: ["Puja Bells", "Diya & Lamps", "Toran & Bandhanwar", "Kalash"] },
            { name: "Prayer Accessories", children: ["Rudraksha Mala", "Tulsi Mala", "Chunari", "Gomukhi Japa Bag"] },
            { name: "Festive Items", children: ["Navratri Garba Kit", "Diwali Puja Kit", "Makar Sankranti Puja Kit"] }
        ]
    },



];


export const Sizes = [
    {
      name: "Women Ethnic",
      size: [
        { id: 1, size: "XS" },
        { id: 2, size: "S" },
        { id: 3, size: "M" },
        { id: 4, size: "L" },
        { id: 5, size: "XL" },
        { id: 6, size: "XXL" },
        { id: 7, size: "3XL" },
        { id: 8, size: "4XL" },
        { id: 9, size: "Free Size" },
      ],
    },
    {
      name: "Women Western",
      size: [
        { id: 10, size: "XS" },
        { id: 11, size: "S" },
        { id: 12, size: "M" },
        { id: 13, size: "L" },
        { id: 14, size: "XL" },
        { id: 15, size: "XXL" },
      ],
    },
    {
      name: "Men",
      size: [
        { id: 16, size: "S" },
        { id: 17, size: "M" },
        { id: 18, size: "L" },
        { id: 19, size: "XL" },
        { id: 20, size: "XXL" },
        { id: 21, size: "3XL" },
      ],
    },
    {
      name: "Kids",
      size: [
        { id: 22, size: "0-3 Months" },
        { id: 23, size: "3-6 Months" },
        { id: 24, size: "6-12 Months" },
        { id: 25, size: "1-2 Years" },
        { id: 26, size: "2-3 Years" },
        { id: 27, size: "3-4 Years" },
        { id: 28, size: "4-5 Years" },
        { id: 29, size: "5-6 Years" },
        { id: 30, size: "6-7 Years" },
        { id: 31, size: "7-8 Years" },
        { id: 32, size: "8-9 Years" },
        { id: 33, size: "9-10 Years" },
        { id: 34, size: "10-11 Years" },
        { id: 35, size: "11-12 Years" },
      ],
    },
    {
      name: "Bags and Footwear",
      size: [
        { id: 36, size: "4" },
        { id: 37, size: "5" },
        { id: 38, size: "6" },
        { id: 39, size: "7" },
        { id: 40, size: "8" },
        { id: 41, size: "9" },
        { id: 42, size: "10" },
        { id: 43, size: "Free Size" },
      ],
    },
  ]
  
   export const ratingData = [
    {
      label: (
        <>
          <RxStarFilled /> <RxStarFilled /> <RxStarFilled /> <RxStarFilled />{" "}
          <RxStarFilled />{" "}
        </>
      ),
      value: 5,
    },
    {
      label: (
        <>
          <RxStarFilled /> <RxStarFilled /> <RxStarFilled /> <RxStarFilled />{" "}
          
        </>
      ),
      value: 4,
    },
    {
      label: (
        <>
          <RxStarFilled /> <RxStarFilled /> <RxStarFilled /> 
        </>
      ),
      value: 3,
    },
    {
      label: (
        <>
          <RxStarFilled /> <RxStarFilled /> 
        </>
      ),
      value: 2,
    },
    {
      label: (
        <>
          <RxStarFilled /> 
        </>
      ),
      value: 1,
    },
  ];