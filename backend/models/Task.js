import mongoose from 'mongoose';  

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { 
        type: String, 
        enum: ['completed', 'upcoming', 'priority', 'favorites'],
        required: false
    },
    // dueDate: { type: Date },
    // isCompleted: { type: Boolean, default: false },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
});

taskSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Экспортируем модель с использованием ES Modules
export default mongoose.model('Task', taskSchema);