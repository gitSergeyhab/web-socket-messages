import { Types } from "mongoose";
import { ChatMessageDocument, MessageModel } from "../models/Message";
import { RequestMessage } from "../types/message";
import { AuthUserData } from "../types/user";
import { logger } from "../lib/utils/logger";
import { sendErrorMessage } from "../lib/helpers/socket";

type DBMessage = ChatMessageDocument & {
  _id: Types.ObjectId;
};
export const createNewMessage = async ({
  message,
  roomId,
  userInfo,
  socketId,
}: {
  message: RequestMessage;
  roomId: string;
  userInfo: AuthUserData;
  socketId: string;
}): Promise<DBMessage | null> => {
  try {
    const { id, first_name, last_name, role } = userInfo;
    const newMessage = new MessageModel({
      ...message,
      roomId,
      userId: id,
      userName: `${first_name} ${last_name}`,
      userRole: role,
    });
    await newMessage.save();
    return newMessage;
  } catch (err) {
    sendErrorMessage(socketId, "отправка сообщений в данный момент невозможна");
    logger.error(`save message to db: ${err}`);
    return null;
  }
};

export const getRoomMessages = async (
  roomId: string,
  socketId: string
): Promise<DBMessage[]> => {
  try {
    return await MessageModel.find({ roomId, isDeleted: false });
  } catch (err) {
    sendErrorMessage(socketId, "сообщения чата недоступны");
    logger.error(`get messages from db: ${err}`);
    return [];
  }
};

export const deleteMessage = async (messageId: string, socketId: string) => {
  try {
    await MessageModel.findByIdAndUpdate(messageId, { isDeleted: true });
  } catch (err) {
    sendErrorMessage(socketId, "удаление сообщения невозможно");
    logger.error(`delete message from db: ${err}`);
  }
};
