import path from "./path";
import icons from "./icons";
import { VoteOption } from "../components";
const {
  IoShieldHalf,
  FaTruck,
  IoGiftSharp,
  FaReply,
  FaTty,
  AiOutlineDashboard,
  MdGroups,
  RiProductHuntLine,
  RiBillLine,
} = icons;

export const navigation = [
  {
    id: 0,
    value: "HOME",
    path: `${path.HOME}`,
  },
  {
    id: 1,
    value: "PRODUCTS",
    path: `${path.PRODUCTS}`,
  },
  {
    id: 2,
    value: "BLOGS",
    path: `${path.BLOGS}`,
  },
  {
    id: 3,
    value: "OUR SERVICES",
    path: `${path.OUR_SERVICES}`,
  },
  {
    id: 4,
    value: "FAQs",
    path: `${path.FAQS}`,
  },
];

export const productExtrainfoData = [
  {
    id: 1,
    title: "Guarantee",
    sub: "Quality Checked",
    icon: <IoShieldHalf />,
  },
  {
    id: 2,
    title: "Free Shipping",
    sub: "Free On All Products",
    icon: <FaTruck />,
  },
  {
    id: 3,
    title: "Special Gift Cards",
    sub: "Special Gift Cards",
    icon: <IoGiftSharp />,
  },
  {
    id: 4,
    title: "Free Return",
    sub: "Within 7 Days",
    icon: <FaReply />,
  },
  {
    id: 5,
    title: "Consultancy",
    sub: "Lifetime 24/7/356",
    icon: <FaTty />,
  },
];

export const productInfoTabs = [
  {
    id: 1,
    name: "DESCRIPTION",
    content: ` Technology: GSM / HSPA / LTE
    Dimensions: 146 x 72 x 8.1 mm
    Weight: 161 g
    Display: IPS LCD 5.2 inches
    Resolution: 1080 x 1920
    OS: Android OS, v6.0.1 (Marshmallow)
    Chipset: Snapdragon 820
    CPU: Quad-core
    Internal: 32/64 GB
    Camera: 23 MP, f/2.0 - 13 MP, f/2.0
    Sony's latest flagship, the Xperia Z6 comes with refined design, improved camera, and a due update in specs. Wait, back up a little there - it's actually called the Xperia XZ this time around but, yeah, the rest of that is true.
    
    When Sony announced the new X-series, some suggested that the Xperia X Performance was meant to take on the likes of the Galaxy S7's and HTC 10's, but we knew that couldn't be the case. Okay, 'suspected' might be more accurate there. Obviously, now we all know that the Xperia XZ is Sony's top-dog for this season, and the Z in its name quickly reveals its ancestry.
    
    Indeed, the XZ has a lot in common with the Z5. The display, for one, is the same size and resolution as the last generation - not necessarily a bad thing, but the XZ also comes with 3GB of RAM - modern-day flagships will crack a condescending smile seeing that in the spec sheet.
    
    No one will laugh at the rest of it, though - top-of-the-line Snapdragon 820 chipset, 23MP camera with a trio of focusing technologies and 4K video recording (one could think the Z is required for that, had it not been for the M5), high-res 13MP front camera, Type-C connectivity, fingerprint reader, IP68 rating, stereo speakers - name one thing missing. `,
  },
  {
    id: 2,
    name: "WARRANTY",
    content: `WARRANTY INFORMATION
    LIMITED WARRANTIES
    Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
    
    Frames Used In Upholstered and Leather Products
    Limited Lifetime Warranty
    A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
  },
  {
    id: 3,
    name: "DELIVERY",
    content: `
    PURCHASING & DELIVERY
Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
Picking up at the store
Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
Delivery
Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`,
  },
  {
    id: 4,
    name: "PAYMENT",
    content: `
Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.
    `,
  },
];

export const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "brown",
  "black",
  "white",
  "gray",
];

export const sorts = [
  {
    id: 1,
    value: "-sold",
    text: "Best selling",
  },
  {
    id: 2,
    value: "-title",
    text: "Alphabetically, A-Z",
  },
  {
    id: 3,
    value: "title",
    text: "Alphabetically, Z-A",
  },
  {
    id: 4,
    value: "-price",
    text: "Price, low to high",
  },
  {
    id: 5,
    value: "price",
    text: "Price, high to low",
  },
  {
    id: 6,
    value: "-createAt",
    text: "Date, old to new",
  },
  {
    id: 7,
    value: "createAt",
    text: "Date, new to old",
  },
];

export const voteOptions = [
  { id: 1, text: "Terrible" },
  { id: 2, text: "Bad" },
  { id: 3, text: "Neutral" },
  { id: 4, text: "Good" },
  { id: 5, text: "Perfect" },
];

export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiOutlineDashboard size={20}></AiOutlineDashboard>,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Manage users",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <MdGroups size={20}></MdGroups>,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Manage products",
    icon: <RiProductHuntLine size={20}></RiProductHuntLine>,
    submenu: [
      {
        text: "Create product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
      },
      {
        text: "Manage product",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Manage orders",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <RiBillLine size={20}></RiBillLine>,
  },
];

export const memberSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Personal",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <AiOutlineDashboard size={20}></AiOutlineDashboard>,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "My Cart",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <MdGroups size={20}></MdGroups>,
  },
  {
    id: 3,
    type: "SINGLE",
    text: "Buy Histories",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <RiBillLine size={20}></RiBillLine>,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Wislist",
    path: `/${path.MEMBER}/${path.WISLIST}`,
    icon: <RiBillLine size={20}></RiBillLine>,
  },
];

export const limit = 8;

export const roles = [
  {
    id: 1,
    value: "admin",
  },
  {
    id: 2,
    value: "user",
  },
];

export const blockStatus = [
  {
    id: 1,
    value: "Blocked",
  },
  {
    id: 2,
    value: "Active",
  },
];
