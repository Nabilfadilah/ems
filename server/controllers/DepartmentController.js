import Department from "../models/Department.js";

// get
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({success: true, departments})
    } catch(error) {
        return res.status(500).json({success: false, error: "add department server error"})
    }
}

// add 
const addDepartment = async (req, res) => {
    try {
        const {dep_name, description} = req.body;
        const newDep = new Department({
            dep_name,
            description
        })
        await newDep.save()
        return res.status(200).json({success: true, department: newDep})
    } catch (error) {
        return res.status(500).json({success: false, error: "add department server error"})
    }
}

// get id 
const getDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const department = await Department.findById({_id: id})
        return res.status(200).json({success: true, department})

    }catch (error) {
        return res.status(500).json({success: false, error: "get department server error"})
    }
}

// update
const updateDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const {dep_name, description} = req.body;
        const updateDep = await Department.findByIdAndUpdate({_id: id}, {
            dep_name,
            description
        }) 
        return res.status(200).json({success: true, updateDep})

    } catch (error) {
        return res.status(500).json({success: false, error: "edit department server error"})
    }
}

// delete 
const deleteDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        // const deletedep = await Department.findByIdAndDelete(id);
        const deletedep = await Department.findById({_id: id}) // kalau pakai ini gak langsung refresh
        await deletedep.deleteOne()
        
        return res.status(200).json({success: true, deletedep})

    } catch (error) {
        return res.status(500).json({success: false, error: "delete department server error"})
    }
}

export {addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment}