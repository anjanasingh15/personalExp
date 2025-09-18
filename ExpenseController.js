const UserModel = require("../Models/User");



const addExpenses= async (req,res)=>{
    const body =req.body;
    const{_id}=req.user;
try {
  const userData= await UserModel.findByIdAndUpdate(
    _id,
    {
        $push:{ expenses: req.body}
    },
    {new:true} //for returning the updated documents

);
return res.status(200).json({
    message:"Expense Added Successfully",
    success:true,
    data: userData?.expenses
});

}
catch(err) {
    return res.status(500).json(
        {
            message:"Something went wrong",
            error:err,
            success:false
        }
    )
}
}

const fetchExpenses= async (req,res)=>{
     const body =req.body;
    const{_id}=req.user;
try {
  const userData= await UserModel.findById(_id).select('expenses');
return res.status(200).json({
    message:"Fetched Expenses Successfully",
    success:true,
    data: userData?.expenses
});

}
catch(err) {
    return res.status(500).json(
        {
            message:"Something went wrong",
            error:err,
            success:false
        }
    )
}
}
const deleteExpenses = async (req, res) => {
    try {
        const { _id } = req.user;
        const { expenseId } = req.params;

        // Corrected Mongoose query
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $pull: { expenses: { _id: expenseId } } },
            { new: true }
        );

        if (!userData) {
            return res.status(404).json({
                message: "User not found or expense not deleted",
                success: false
            });
        }

        // Return the updated data to the frontend
        return res.status(200).json({
            message: "Expense Deleted Successfully",
            success: true,
            data: userData?.expenses
        });
    } catch (err) {
        // Log the error for debugging
        console.log(err);
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};

module.exports = {
     addExpenses,
     fetchExpenses,
     deleteExpenses
}