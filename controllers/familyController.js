const catchAsync = require("../utils/catchAsync");
const { getOne, createOne, updateOne, getAll } = require("./helperController");
const FamilyMember = require("../models/familyMemeberModel");

exports.addFamilyMember = createOne(FamilyMember, [
  "user",
  "firstName",
  "lastName",
  "sex",
  "email",
  "phoneNumber",
  "placeOfResidence",
  "dateOfBirth",
  "parents",
]);

exports.getAllMembers = getAll(FamilyMember);

exports.updateFamilyMember = updateOne(FamilyMember, [
  "user",
  "firstName",
  "lastName",
  "sex",
  "email",
  "phoneNumber",
  "placeOfResidence",
  "dateOfBirth",
  "parents",
]);

exports.getFamilyMember = getOne(FamilyMember, "parents");

exports.getSibblings = catchAsync(async (req, res, next) => {
  const member = await FamilyMember.findById(req.params.id);

  if (!member) {
    return next(
      res.status(404).json({
        status: "Not found",
        data: "Document not found",
      })
    );
  }
  const parents = member.parents
  const siblings = await FamilyMember.find({ parents });
  const uniqueSiblings = siblings.filter(sibling => sibling.id != member.id)

  return res.status(200).json({
    status: "OK",
    data: uniqueSiblings,
  });
});

exports.getChildren = catchAsync(async (req, res, next) => {
  const parent = req.params.parent;

  const children = await FamilyMember.find({ parents: { $in: [parent] } });

  return res.status(200).json({
    status: "OK",
    data: children,
  });
});
