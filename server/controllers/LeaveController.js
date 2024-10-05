import multer from "multer"
import Employee from "../models/Employee.js"
import User from "../models/User.js"
import bcrypt from "bcrypt"
import path from "path"
import Leave from "../models/Leave.js"

// get all admin dashboard
// const getLeaves = async (req, res) => {
//     try {
//         const employees = await Employee.find().populate('userId', {password: 0}).populate("department")
//         return res.status(200).json({success: true, employees})
//     } catch(error) {
//         return res.status(500).json({success: false, error: "get employee server error"})
//     }
// }

// get all employee dashboard
const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                {
                    path: "department",
                    select: "dep_name"
                },
                {
                    path: "userId",
                    select: "name"
                }
            ]
        })
        return res.status(200).json({success: true, leaves})

    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "get leaves server error"})
    }
}

// get by id #1
// const getLeave = async (req, res) => {

//     try {
//         const {id} = req.params;
//         const employee = await Employee.findOne({userId: id})

//         const leave = await Leave.find({employeeId: employee._id})
//         return res.status(200).json({success: true, leave})
//     } catch(error) {
//         return res.status(500).json({success: false, error: "get leave server error"})
//     }
// }

// get by id #2
const getLeave = async (req, res) => {

    try {
        const {id} = req.params;
        let leaves = await Leave.find({employeeId: id})
        if(!leaves || leaves.length === 0 ) {
            const employee = await Employee.findOne({userId: id})
            leaves = await Leave.find({employeeId: employee._id})
        }

        return res.status(200).json({success: true, leaves})
        
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({success: false, error: "get leave server error"})
    }
}

// add
const addLeave = async (req, res) => {
    try {
        const {
            userId,
            leaveType,
            startDate,
            endDate,
            reason} = req.body

        const employee = await Employee.findOne({userId})

        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason,
        })

        await newLeave.save()

        return res.status(200).json({success: true})

    } catch(error) {
        return res.status(500).json({success: false, error: "leave add server error"})
    }
}

export {addLeave, getLeaves, getLeave}