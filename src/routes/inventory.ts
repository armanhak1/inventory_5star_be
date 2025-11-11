import { Router, Request, Response } from 'express';
import { ItemModel } from '../models/Item';
import { Item } from '../types';

const router = Router();

// GET all inventory items
router.get('/', async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.find().sort({ updatedAt: -1 });
    res.json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inventory items',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET single item by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await ItemModel.findById(id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch item',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST create new item
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, type, value, notes } = req.body;
    
    if (!name || !type || value === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, type, value'
      });
    }
    
    const newItem = new ItemModel({
      name,
      type,
      value,
      notes,
      updatedAt: new Date().toISOString()
    });
    
    await newItem.save();
    
    res.status(201).json({
      success: true,
      data: newItem
    });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create item',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// PUT update item by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Add updatedAt timestamp
    updates.updatedAt = new Date().toISOString();
    
    const item = await ItemModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update item',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// PUT bulk update items
router.put('/bulk/update', async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    
    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'items must be an array'
      });
    }
    
    // Update each item individually
    const updatePromises = items.map(async (item: Item) => {
      if (item.id) {
        return await ItemModel.findByIdAndUpdate(
          item.id,
          { ...item, updatedAt: new Date().toISOString() },
          { new: true, runValidators: true }
        );
      }
    });
    
    const updatedItems = await Promise.all(updatePromises);
    
    res.json({
      success: true,
      data: updatedItems.filter(item => item !== null)
    });
  } catch (error) {
    console.error('Error bulk updating items:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to bulk update items',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// DELETE item by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await ItemModel.findByIdAndDelete(id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete item',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// DELETE all items (clear database)
router.delete('/all', async (req: Request, res: Response) => {
  try {
    const result = await ItemModel.deleteMany({});
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} items`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error clearing inventory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear inventory',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
