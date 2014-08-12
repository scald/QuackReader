Meteor.publish("lastQuack", function () {
  return Quacks.find();
});