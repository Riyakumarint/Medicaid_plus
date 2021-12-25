const router = require("express").Router();
const Conversation = require("../models/Conversations");

//new Conversation

router.post("/", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });
    // console.log("hello: " + conversation);
    if (conversation === null) {
      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
      });

      try {
        const savedConversation = await newConversation.save();
        // console.log("buy: " + savedConversation);
        res.status(200).json(savedConversation);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(200).json(conversation);
    }
  } catch (err) {
    res.status(200).json(err);
  }
});

//get Conversation of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conversation includes 2 userid
router.get("/find/:firstUID/:secondUID", async (req, res) => {
  // console.log("vfsv: " + req.params.firstUID + " " + req.params.secondUID);
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUID, req.params.secondUID] },
    });
    // console.log(conversation);
    res.status(200).json(conversation);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
