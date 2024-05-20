import { Types } from "mongoose";
import { ChatMessageDocument, MessageModel } from "../../../models/Message";
import { RequestMessage } from "../../../types/message";
import { AuthUserData } from "../../../types/user";

type DBMessage = ChatMessageDocument & {
  _id: Types.ObjectId;
};
export const createNewMessage = async ({
  message,
  roomId,
  userInfo,
}: {
  message: RequestMessage;
  roomId: string;
  userInfo: AuthUserData;
}): Promise<DBMessage | null> => {
  try {
    const { id, name, role } = userInfo;
    const newMessage = new MessageModel({
      ...message,
      roomId,
      userId: id,
      userName: name,
      userRole: role,
    });
    await newMessage.save();
    return newMessage;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getRoomMessages = async (roomId: string): Promise<DBMessage[]> => {
  try {
    return await MessageModel.find({ roomId, isDeleted: false });
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    await MessageModel.findByIdAndUpdate(messageId, { isDeleted: true });
  } catch (err) {
    console.error(err);
  }
};
