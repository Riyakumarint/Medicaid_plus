const router = require('express').Router()
const Conversation = require("../models/Conversations");

//new Conversation

router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
    console.log(savedConversation);
  } catch (err) {
    res.status(500).json(err);
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
router.get("/find/:firstUID/:secondUID",async (req,res)=>{
  try{
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUID,req.params.secondUID] },
    });
    res.status(200).json(conversation);
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router