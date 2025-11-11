import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { ItemModel } from './models/Item';

dotenv.config();

// Sample data for seeding
const sampleItems = [
  {
    name: 'Wheelchairs',
    type: 'qty' as const,
    value: 12,
    notes: 'Standard wheelchairs available',
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Walker Inventory',
    type: 'qty' as const,
    value: 8,
    notes: 'Rolling walkers with seats',
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Oxygen Tanks',
    type: 'qty' as const,
    value: 15,
    notes: 'Small portable oxygen tanks',
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Hospital Beds',
    type: 'qty' as const,
    value: 6,
    notes: 'Adjustable hospital beds',
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Staff Attendance',
    type: 'pct' as const,
    value: 95,
    notes: 'Overall staff attendance rate',
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Medication Compliance',
    type: 'pct' as const,
    value: 98,
    notes: 'Medication administration compliance',
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Patient Satisfaction',
    type: 'pct' as const,
    value: 92,
    notes: 'Based on monthly surveys',
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Wound Care Supplies',
    type: 'qty' as const,
    value: 45,
    notes: 'Various bandages and dressings',
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Bed Occupancy Rate',
    type: 'pct' as const,
    value: 88,
    notes: 'Current facility occupancy',
    updatedAt: new Date().toISOString()
  },
  {
    name: 'Blood Pressure Monitors',
    type: 'qty' as const,
    value: 10,
    notes: 'Digital BP monitors',
    updatedAt: new Date().toISOString()
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    // Connect to database
    await connectDatabase();
    
    // Check if items already exist
    const existingCount = await ItemModel.countDocuments();
    
    if (existingCount > 0) {
      console.log(`ℹ️  Database already has ${existingCount} items`);
      console.log('⚠️  Skipping seed to preserve existing data');
      console.log('💡 To reset data, manually delete items first');
      process.exit(0);
    }
    
    // Insert sample data only if database is empty
    const insertedItems = await ItemModel.insertMany(sampleItems);
    
    console.log(`✅ Successfully seeded ${insertedItems.length} items`);
    console.log('\nSeeded items:');
    insertedItems.forEach(item => {
      console.log(`  • ${item.name} (${item.type}): ${item.value}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
