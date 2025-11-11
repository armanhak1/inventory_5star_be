import mongoose, { Schema, Document } from 'mongoose';
import { Item as IItem } from '../types';

// Extend the Item interface to include MongoDB Document properties
export interface IItemDocument extends Omit<IItem, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const ItemSchema = new Schema<IItemDocument>(
  {
    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
      maxlength: [100, 'Item name cannot exceed 100 characters']
    },
    type: {
      type: String,
      required: [true, 'Item type is required'],
      enum: {
        values: ['qty', 'pct'],
        message: 'Type must be either qty or pct'
      }
    },
    value: {
      type: Number,
      required: [true, 'Item value is required'],
      min: [0, 'Value cannot be negative'],
      validate: {
        validator: function(v: number) {
          if (this.type === 'pct') {
            return v <= 100;
          }
          return true;
        },
        message: 'Percentage value cannot exceed 100'
      }
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters']
    },
    updatedAt: {
      type: String,
      default: () => new Date().toISOString()
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    toJSON: {
      transform: function(_doc, ret) {
        // Convert _id to id for frontend compatibility
        ret.id = ret._id.toString();
        // Remove MongoDB internal fields
        const { _id, __v, ...rest } = ret;
        return { id: ret.id, ...rest };
      }
    }
  }
);

// Indexes for better query performance
ItemSchema.index({ name: 1 });
ItemSchema.index({ type: 1 });
ItemSchema.index({ updatedAt: -1 });

// Update the updatedAt field before saving
ItemSchema.pre('save', function(next) {
  this.updatedAt = new Date().toISOString();
  next();
});

export const ItemModel = mongoose.model<IItemDocument>('Item', ItemSchema);

