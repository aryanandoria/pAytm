const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://aryanandoria447:nayra123@cluster0.zo6ak.mongodb.net/paytm', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1);  
    }
};

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0  // Optional: Set a default amount value
    }
});

const AccountSchema =  new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance:{
        type: Number,
        required:true,
    }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account",AccountSchema);

module.exports = { connectDB, User, Account };
