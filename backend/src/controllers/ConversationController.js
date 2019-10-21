const User = require("../models/User");
const Conversation = require("../models/Conversation");

module.exports = {
  async index(req, res) {
    const conversations = await Conversation.find();
    return res.json(conversations);
  },

  async show(req, res) {
    const { user_id } = req.headers;
    const { receiver_id } = req.params;

    const userReceiver = await User.findById(receiver_id);
    const userSender = await User.findById(user_id);

    if (!userReceiver) {
      return res.status(400).json({ error: "Receptor não existe" });
    }

    if (!userSender) {
      return res.status(400).json({ error: "Remetente não existe" });
    }

    const conversations = await Conversation.find({
      $or: [
        {
          $and: [{ sender: user_id }, { receiver: receiver_id }]
        },
        {
          $and: [{ sender: receiver_id }, { receiver: user_id }]
        }
      ]
    }).sort({ createdAt: 1 });

    // const sendedConversations = await Conversation.find({
    //   $and: [{ sender: user_id }, { receiver: receiver_id }]
    // });

    // const receivedConversations = await Conversation.find({
    //   $and: [{ sender: receiver_id }, { receiver: user_id }]
    // });

    // const conversations = sendedConversations.concat(receivedConversations);

    return res.json(conversations);
  },

  async store(req, res) {
    const { message } = req.body;
    const { receiver_id } = req.params;
    const { user_id } = req.headers;

    const userReceiver = await User.findById(receiver_id);
    const userSender = await User.findById(user_id);

    if (!userReceiver) {
      return res.status(400).json({ error: "Receptor não existe" });
    }

    if (!userSender) {
      return res.status(400).json({ error: "Remetente não existe" });
    }

    const conversation = await Conversation.create({
      receiver: receiver_id,
      sender: user_id,
      message
    });

    return res.json(conversation);
  },

  async update(req, res) {
    const { id } = req.params;

    const conversation = await Conversation.findByIdAndUpdate(id, req.body, {
      new: true
    });

    return res.json(conversation);
  },

  async destroy(req, res) {
    const { id } = req.params;

    await Conversation.findByIdAndDelete(id);

    return res.send();
  }
};
