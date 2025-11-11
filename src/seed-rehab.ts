import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { ItemModel } from './models/Item';

dotenv.config();

// Rehabilitation Center Inventory Data
const rehabInventoryItems = [
  { name: 'Oven Cleaner', type: 'qty' as const, value: 10, notes: 'Kitchen use' },
  { name: 'Glass Cleaner', type: 'qty' as const, value: 1, notes: 'For mirrors/windows' },
  { name: 'Charcoal Lighter', type: 'qty' as const, value: 2, notes: 'Outdoor use' },
  { name: 'Raid Max', type: 'qty' as const, value: 2, notes: 'Insect control' },
  { name: 'Bed Spray', type: 'qty' as const, value: 2, notes: 'Bedding hygiene' },
  { name: 'Spider Killer', type: 'qty' as const, value: 1, notes: 'Pest control' },
  { name: 'Hardwood Cleaner', type: 'qty' as const, value: 1, notes: 'Floor care' },
  { name: 'Cleaning Gel', type: 'qty' as const, value: 1, notes: 'General cleaning' },
  { name: 'WD-40', type: 'qty' as const, value: 1, notes: 'Maintenance' },
  { name: 'Toilet Bowl Cleaner', type: 'qty' as const, value: 1, notes: 'Bathroom use' },
  { name: 'Drono Ultra Cleaner', type: 'qty' as const, value: 2, notes: 'Deep cleaning' },
  { name: 'Clorox 3.58 L', type: 'qty' as const, value: 2, notes: 'Disinfection' },
  { name: 'Hand Soap 1 Gallon', type: 'qty' as const, value: 2, notes: 'Refill use' },
  { name: '100% Nasan Nasal Spray 4 mg', type: 'pct' as const, value: 100, notes: 'Medical use' },
  { name: 'Large Paper Towel Rolls', type: 'qty' as const, value: 21, notes: 'Hand drying' },
  { name: 'Toilet Paper', type: 'qty' as const, value: 23, notes: 'Restroom' },
  { name: 'Small Trash Bags', type: 'qty' as const, value: 6, notes: 'Small bins' },
  { name: 'Medium Trash Bags (White)', type: 'qty' as const, value: 2, notes: 'Regular bins' },
  { name: 'Large Trash Bags (Black)', type: 'qty' as const, value: 2, notes: 'Outdoor bins' },
  { name: 'White Disposable Slippers', type: 'qty' as const, value: 38, notes: 'Guest use' },
  { name: 'Black Disposable Slippers', type: 'qty' as const, value: 10, notes: 'Guest use' },
  { name: 'CA-Rezz Incontinent Wash', type: 'qty' as const, value: 12, notes: 'Patient care' },
  { name: 'Table Tennis Balls', type: 'qty' as const, value: 24, notes: 'Recreation' },
  { name: 'Soap Dish', type: 'qty' as const, value: 1, notes: 'Bathroom' },
  { name: 'Self-Adhesive Paper 45×25 cm', type: 'qty' as const, value: 4, notes: 'Labels/stickers' },
  { name: 'Shower Head', type: 'qty' as const, value: 2, notes: 'Replacement' },
  { name: 'Ashtray', type: 'qty' as const, value: 6, notes: 'Outdoor area' },
  { name: 'RCA Remote Control', type: 'qty' as const, value: 1, notes: 'Common room' },
  { name: 'Mini Chalkboard Sign', type: 'qty' as const, value: 1, notes: 'Notes/labels' },
  { name: '9 W Light Bulb', type: 'qty' as const, value: 1, notes: 'Replacement' },
  { name: 'A4 Paper', type: 'qty' as const, value: 24, notes: 'Office use' },
  { name: 'Keurig Coffee Machine', type: 'qty' as const, value: 1, notes: 'Kitchen' },
  { name: 'Scale', type: 'qty' as const, value: 2, notes: 'Medical use' },
  { name: 'Comb', type: 'qty' as const, value: 36, notes: 'Personal care' },
  { name: 'Fabuloso Cleaner 6.2 L', type: 'qty' as const, value: 1, notes: 'Floor cleaning' },
  { name: 'Ecos Laundry Detergent', type: 'qty' as const, value: 4, notes: 'Laundry' },
  { name: 'Scrub Sponges', type: 'qty' as const, value: 20, notes: 'Cleaning' },
  { name: 'Sporog Cleaner', type: 'qty' as const, value: 30, notes: 'Sanitizing' },
  { name: 'Raincoat', type: 'qty' as const, value: 10, notes: 'Outdoor/emergency' }
];

const seedRehabInventory = async () => {
  try {
    console.log('🏥 Starting Rehabilitation Center Inventory seed...');
    console.log('⚠️  This will DELETE all existing data and add 39 new items!\n');
    
    // Connect to database
    await connectDatabase();
    
    // Clear existing data
    const deleteResult = await ItemModel.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing items\n`);
    
    // Insert rehabilitation inventory data
    const itemsWithTimestamp = rehabInventoryItems.map(item => ({
      ...item,
      updatedAt: new Date().toISOString()
    }));
    
    const insertedItems = await ItemModel.insertMany(itemsWithTimestamp);
    
    console.log(`✅ Successfully seeded ${insertedItems.length} rehabilitation inventory items\n`);
    console.log('Seeded items:');
    insertedItems.forEach((item, index) => {
      const typeLabel = item.type === 'qty' ? 'qty' : 'pct';
      const valueLabel = item.type === 'pct' ? `${item.value}%` : item.value;
      console.log(`  ${String(index + 1).padStart(2)}. ${item.name.padEnd(35)} ${String(valueLabel).padStart(5)} (${typeLabel}) - ${item.notes}`);
    });
    
    console.log(`\n🎉 Database ready with ${insertedItems.length} items!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedRehabInventory();

