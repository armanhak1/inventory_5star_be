# 5 Star Care - Inventory Management Backend

Backend API for the 5 Star Care Rehabilitation Center Inventory Management System.

## 🚀 Features

- ✅ **RESTful API** - Full CRUD operations for inventory management
- ✅ **MongoDB Atlas** - Cloud database with persistent storage
- ✅ **TypeScript** - Type-safe backend code
- ✅ **Express** - Fast, minimal web framework
- ✅ **CORS Enabled** - Configured for frontend connection
- ✅ **Data Validation** - Mongoose schema validation
- ✅ **Safe Seeding** - Preserves existing data
- ✅ **39 Inventory Items** - Real rehabilitation center inventory

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB + Mongoose** - Database and ODM
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

## 📦 Installation

```bash
npm install
```

## 🔧 Configuration

### 1. Create `.env` file

Copy `.env.example` to `.env` and update with your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/five-star-care?retryWrites=true&w=majority
PORT=3000
NODE_ENV=development
```

### 2. Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click your cluster → "Connect"
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Add `/five-star-care` after `.mongodb.net`

## 🌱 Seed Database

### Safe Seed (Preserves Existing Data)
```bash
npm run seed
```
Only adds items if database is empty.

### Force Seed (Resets Data)
```bash
npm run seed:force
```
Deletes all items and adds 10 generic samples.

### Rehab Inventory (39 Real Items)
```bash
npm run seed:rehab
```
Loads actual rehabilitation center inventory.

## 🚀 Running the Server

### Development Mode
```bash
npm run dev
```
Server runs on http://localhost:3000 with hot reload.

### Production Mode
```bash
npm run build
npm start
```

## 📡 API Endpoints

Base URL: `http://localhost:3000/api/inventory`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inventory` | Get all items |
| GET | `/api/inventory/:id` | Get single item by ID |
| POST | `/api/inventory` | Create new item |
| PUT | `/api/inventory/:id` | Update item by ID |
| PUT | `/api/inventory/bulk/update` | Bulk update items |
| DELETE | `/api/inventory/:id` | Delete item by ID |
| DELETE | `/api/inventory/all` | Clear all items |

## 📝 API Examples

### Get All Items
```bash
curl http://localhost:3000/api/inventory
```

### Create Item
```bash
curl -X POST http://localhost:3000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Item",
    "type": "qty",
    "value": 10,
    "notes": "Test item"
  }'
```

### Update Item
```bash
curl -X PUT http://localhost:3000/api/inventory/:id \
  -H "Content-Type: application/json" \
  -d '{
    "value": 20
  }'
```

### Delete Item
```bash
curl -X DELETE http://localhost:3000/api/inventory/:id
```

## 🗄️ Database Structure

**Database:** `five-star-care`  
**Collection:** `items`

**Schema:**
```typescript
{
  _id: ObjectId,          // MongoDB ID (auto-generated)
  name: String,           // Item name (required, max 100 chars)
  type: 'qty' | 'pct',   // Type: quantity or percentage
  value: Number,          // Current value (min: 0)
  notes: String,          // Optional notes (max 500 chars)
  updatedAt: String,      // ISO timestamp
  createdAt: Date,        // Auto-generated
}
```

## 📊 Inventory Items

The database includes 39 real rehabilitation center items:

- **Cleaning Supplies:** Oven Cleaner, Glass Cleaner, Clorox, etc.
- **Medical Items:** Nasal Spray, Incontinent Wash, Scale, etc.
- **Paper Products:** Paper Towels, Toilet Paper, A4 Paper
- **Guest Supplies:** Disposable Slippers (White & Black)
- **Trash Bags:** Small, Medium, Large
- **Recreation:** Table Tennis Balls
- **Equipment:** Coffee Machine, Light Bulbs, Shower Heads, etc.

## 🔒 Security

- ✅ `.env` file protected (in `.gitignore`)
- ✅ MongoDB authentication required
- ✅ Input validation via Mongoose schemas
- ✅ CORS configured for specific origins
- ✅ Error handling throughout

## 🌐 CORS Configuration

Configured to accept requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:5174` (Vite alternate)

Update `src/index.ts` to add production URLs.

## 📁 Project Structure

```
5stat_be/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── models/
│   │   └── Item.ts             # Mongoose schema/model
│   ├── routes/
│   │   └── inventory.ts        # API route handlers
│   ├── types.ts                # TypeScript types
│   ├── seed.ts                 # Safe seed script
│   ├── seed-force.ts           # Force seed (10 items)
│   ├── seed-rehab.ts           # Rehab inventory (39 items)
│   └── index.ts                # Server entry point
├── .env                        # Environment variables (not in git)
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies
└── tsconfig.json               # TypeScript config
```

## 🧪 Testing

### Check Server Status
```bash
curl http://localhost:3000
```

### Get Item Count
```bash
curl http://localhost:3000/api/inventory | jq '.data | length'
```

### Test CRUD Operations
```bash
# Create
curl -X POST http://localhost:3000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","type":"qty","value":5}'

# Read
curl http://localhost:3000/api/inventory

# Update
curl -X PUT http://localhost:3000/api/inventory/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{"value":10}'

# Delete
curl -X DELETE http://localhost:3000/api/inventory/ITEM_ID
```

## 🚀 Deployment

### Environment Variables

Set these in your production environment:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Set to "production"

### Deploy To:
- **Railway** - Easiest for Node.js + MongoDB
- **Render** - Free tier available
- **Heroku** - Classic option
- **DigitalOcean** - App Platform

## 📚 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run production build |
| `npm run seed` | Safe seed (preserves data) |
| `npm run seed:force` | Force seed (10 generic items) |
| `npm run seed:rehab` | Rehab inventory (39 real items) |

## 🔗 Frontend Connection

This backend is designed to work with the 5 Star Care frontend:

**Frontend Repository:** https://github.com/armanhak1/inventory_5start_fe

Make sure the frontend's `config.ts` points to this backend URL.

## 📖 Documentation

- `MONGODB_SETUP.md` - Detailed MongoDB setup guide
- `MONGODB_QUICK_START.md` - Quick start guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT

## 🙏 Credits

Built with ❤️ for 5 Star Care Rehabilitation Center

---

## 🎯 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure MongoDB in .env file
# (Add your MongoDB Atlas connection string)

# 3. Seed database
npm run seed:rehab

# 4. Start server
npm run dev
```

Server runs on http://localhost:3000 🚀
