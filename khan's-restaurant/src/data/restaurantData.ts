import { MenuItem, Review } from '../types';

export const RESTAURANT_INFO = {
  name: "Khan's Restaurant",
  tagline: 'Authentic Indian Taste, Made with Love',
  cuisine: 'South Indian, North Indian',
  type: 'Family Restaurant',
  location: 'Channapatna, Karnataka',
  address: '24, Market Road, Channapatna, Karnataka – 562160',
  phone: '+91 98765 43210',
  phoneClean: '+919876543210',
  email: 'hello@khansrestaurant.example',
  openingHours: '7:00 AM – 10:30 PM',
  operatingDays: 'Monday – Sunday',
  rating: 4.5,
  totalReviewsCount: '1,420+',
  priceRange: '₹₹',
  deliveryAvailable: true,
  takeawayAvailable: true,
  dineInAvailable: true,
  established: '2022',
  seatingCapacity: 60,
  story:
    "Khan's Restaurant is a family-owned restaurant bringing authentic Indian flavors to the heart of Channapatna. Our goal is simple — serve fresh, tasty and affordable food in a welcoming environment.",
  features: [
    'Pure Traditional Ghee & Stone-ground Spices',
    'Speciality Filter Kaapi brewed every 15 minutes',
    'Clean, Hygienic & Air-Cooled Family Dining',
    'Hassle-free Takeaway & Swift Local Delivery',
  ],
};

// High quality, appetizing Unsplash food photography carefully chosen for Indian cuisine
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'masala-dosa',
    name: 'Masala Dosa',
    category: 'South Indian',
    price: 80,
    isVeg: true,
    description:
      'Crispy golden fermented crepe roasted with fresh butter, stuffed with spiced potato palya, served with signature coconut chutney & piping hot sambar.',
    image:
      'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    rating: 4.9,
    spicyLevel: 2,
  },
  {
    id: 'plain-dosa',
    name: 'Plain Dosa',
    category: 'South Indian',
    price: 60,
    isVeg: true,
    description:
      'Paper-thin, crispy rice-lentil dosa roasted on a traditional tawa, served with Karnataka style spicy red chutney, coconut chutney and sambar.',
    image:
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    rating: 4.6,
    spicyLevel: 1,
  },
  {
    id: 'idli-vada',
    name: 'Idli Vada',
    category: 'Breakfast',
    price: 60,
    isVeg: true,
    description:
      'Two melt-in-the-mouth steamed rice idlis paired with a crispy golden medu vada, served with traditional shallot sambar and fresh mint-coconut chutney.',
    image:
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    rating: 4.8,
    spicyLevel: 1,
  },
  {
    id: 'masala-idli',
    name: 'Masala Idli',
    category: 'Breakfast',
    price: 70,
    isVeg: true,
    description:
      'Diced soft idlis tossed in pure desi ghee, mustard seeds, curry leaves, and a fragrant roasted Gunpowder (podi) masala with onions.',
    image:
      'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    rating: 4.7,
    spicyLevel: 2,
  },
  {
    id: 'paneer-butter-masala',
    name: 'Paneer Butter Masala',
    category: 'North Indian',
    price: 180,
    isVeg: true,
    description:
      'Soft cottage cheese cubes simmered in a velvety, mildly sweet and rich tomato-cashew gravy scented with crushed kasuri methi and fresh cream.',
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    rating: 4.8,
    spicyLevel: 1,
  },
  {
    id: 'butter-naan',
    name: 'Butter Naan',
    category: 'North Indian',
    price: 45,
    isVeg: true,
    description:
      'Freshly kneaded dough baked in a high-heat clay tandoor, brushed generously with churned butter for a fluffy, soft and slightly charred finish.',
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    rating: 4.7,
    spicyLevel: 1,
  },
  {
    id: 'veg-biryani',
    name: 'Veg Biryani',
    category: 'Biryani',
    price: 160,
    isVeg: true,
    description:
      'Fragrant aged Basmati rice layered with garden-fresh vegetables, saffron milk, mint, and whole caramelized spices in traditional Dum style.',
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    rating: 4.6,
    spicyLevel: 2,
  },
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    category: 'Biryani',
    price: 220,
    isVeg: false,
    description:
      'Tender, marinated local farm chicken slow-cooked with Seeraga Samba and aromatic whole spices, served with cooling cucumber raita and spicy salan.',
    image:
      'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    rating: 4.9,
    spicyLevel: 3,
  },
  {
    id: 'lemon-rice',
    name: 'Lemon Rice',
    category: 'Rice',
    price: 90,
    isVeg: true,
    description:
      'Zesty Karnataka style Chitranna tempered with crunchy roasted peanuts, mustard seeds, curry leaves, turmeric, and freshly squeezed lemon juice.',
    image:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    rating: 4.5,
    spicyLevel: 1,
  },
  {
    id: 'curd-rice',
    name: 'Curd Rice',
    category: 'Rice',
    price: 80,
    isVeg: true,
    description:
      'Comforting and creamy set yogurt rice gently mashed and tempered with mustard seeds, ginger, green chilies, curry leaves, and pomegranate arils.',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    rating: 4.7,
    spicyLevel: 1,
  },
  {
    id: 'gobi-manchurian',
    name: 'Gobi Manchurian',
    category: 'Starter',
    price: 140,
    isVeg: true,
    description:
      'Crispy fried cauliflower florets tossed in an appetizing Indo-Chinese wok sauce with spring onions, garlic, capsicum, and ginger glaze.',
    image:
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    rating: 4.6,
    spicyLevel: 2,
  },
  {
    id: 'paneer-65',
    name: 'Paneer 65',
    category: 'Starter',
    price: 160,
    isVeg: true,
    description:
      'Juicy paneer cubes spiced with Southern red pepper, curry leaves, crushed coriander, and roasted garlic, shallow fried to a crisp exterior.',
    image:
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    rating: 4.7,
    spicyLevel: 3,
  },
  {
    id: 'filter-coffee',
    name: 'Filter Coffee',
    category: 'Beverage',
    price: 40,
    isVeg: true,
    description:
      'Signature Chikmagalur dark roast decoction froithed with boiled full-cream milk, served steaming hot in traditional brass Davarah and tumbler.',
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    rating: 5.0,
    spicyLevel: 1,
  },
  {
    id: 'fresh-lime-soda',
    name: 'Fresh Lime Soda',
    category: 'Beverage',
    price: 50,
    isVeg: true,
    description:
      'Refreshing sparkling club soda infused with fresh lime juice, rock salt, mint sprig, and your choice of sweet, salted, or mixed flavor.',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    rating: 4.5,
    spicyLevel: 1,
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Rahul',
    location: 'Channapatna',
    rating: 5,
    comment: 'The masala dosa was crispy and delicious. Very good place for breakfast.',
    date: '2 days ago',
  },
  {
    id: 'rev-2',
    author: 'Arjun',
    location: 'Ramanagara',
    rating: 5,
    comment: 'Chicken biryani was really flavorful and the quantity was good.',
    date: '1 week ago',
  },
  {
    id: 'rev-3',
    author: 'Priya',
    location: 'Bengaluru',
    rating: 4,
    comment: 'Nice family restaurant with reasonable prices. Loved the hot filter coffee and clean ambience!',
    date: '2 weeks ago',
  },
];
