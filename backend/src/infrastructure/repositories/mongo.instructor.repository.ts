import { InstructorModel, IInstructor } from "../models/instructor.model";
import { IInstructorRepository } from "../../domain/interfaces/instructor.repository";
import mongoose from "mongoose";
import { Instructor } from "../../domain/entities/instructor.entity";

export class MongoInstructorRepository implements IInstructorRepository {
  async createInstructor(instructor: Instructor): Promise<Instructor> {
    const newInstructor = new InstructorModel(instructor);
    await newInstructor.save();
    return newInstructor;
  }

  async findpendingRequest(instructorId: string): Promise<Instructor | null> {
    const instructorIdObject = new mongoose.Types.ObjectId(instructorId);
    return await InstructorModel.findOne({
      instructorId: instructorIdObject,
      status: "pending",
    });
  }

  async findById(id: string): Promise<Instructor | null> {
    return await InstructorModel.findById(id)
  }

  async findInstructorById(id: string): Promise<Instructor | null> {
    const instructor = await InstructorModel.findById(id).populate({
      path: "instructorId",
      select: "-password",
    });
    return instructor;
  }

  async getAllInstructorsRequest(
    page: number,
    limit: number,
    search?: string
  ): Promise<{ instructors: Instructor[]; total: number }> {
    const skip = (page - 1) * limit;
    const regex = new RegExp(`^${search}`, "i");

    const matchQuery = search
      ? { "instructor.firstname": { $regex: regex } }
      : {};

    const instructors = await InstructorModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "instructorId",
          foreignField: "_id",
          as: "instructor",
        },
      },
      { $unwind: "$instructor" },
      { $match: matchQuery },
      {
        $project: {
          "instructor.password": 0,
          "instructor.__v": 0,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    const total = await InstructorModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "instructorId",
          foreignField: "_id",
          as: "instructor",
        },
      },
      { $unwind: "$instructor" },
      { $match: matchQuery },
      { $count: "total" },
    ]);

    return { instructors, total: total.length > 0 ? total[0]["total"] : 0 };
  }

  async updateInstructor(
    id: string,
    data: string
  ): Promise<Instructor | null> {
    const updatedInstructor = await InstructorModel.findByIdAndUpdate(
      id,
      { status: data },
      { new: true }
    );
    return updatedInstructor;
  }
}
