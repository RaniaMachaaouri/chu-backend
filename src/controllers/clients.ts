import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

import clients from "../models/client";
import { MemCahche } from "../services/memcache";

//get
const getClients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allClients = await clients.find({});
    res.status(200).json(allClients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
//get by id
const getClient = async (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.params.userId;
  try {
    const client = await clients.findById(clientId);

    client
      ? res.status(200).json(client)
      : res.status(404).json({
          message: "Client not found!",
        });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
//delete
const deleteClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientId = req.params.clientId;

  try {
    const client = await clients.findByIdAndDelete(clientId);
    client
      ? res.status(200).json(client)
      : res.status(404).json({ message: "Client not found!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error has occured while saving" });
  }
};
//udate
const UpdateClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientId = req.params.clientId;

  try {
    const query = { _id: new ObjectId(clientId) };
    const result = await clients.updateOne(query, { $set: req.body });
    result
      ? res.status(200).send(`Successfully updated client with id ${clientId}`)
      : res.status(304).send(`Client with id: ${clientId} not updated`);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
};

//ADD
const addClient = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName } = req.body;

    const client = new clients({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
    });

    const newClient = await client.save();

    res.status(200).json(newClient);
  } catch (error) {
    res.status(500).json({ message: "An error has occured while saving" });
  }
};

const assignClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roomId, clientId, action } = req.body;

    if (action === "assign") {
      MemCahche.getInstance().assignClientToRoom(roomId, clientId);
      res.status(200).json({
        message: `Client ${clientId} successfully assigned to room ${roomId}`,
      });
    } else if (action === "move") {
      const room = MemCahche.getInstance().moveClientFromRoom(clientId);
      res.status(200).json({
        message: `Client ${clientId} successfully removed from room ${room}`,
      });
    } else res.status(304).json({ message: `Nothing has changed` });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  addClient,
  getClient,
  getClients,
  UpdateClient,
  deleteClient,
  assignClient,
};
