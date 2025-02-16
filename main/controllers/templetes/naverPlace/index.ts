function templeteNaverPlace({ logicType }) {
  playSelectLogic({ logicType });
}

function playSelectLogic({ logicType }) {
  naverPlaceLogic1({ logicType });
  naverPlaceLogic2({ logicType });
}

function naverPlaceLogic1({ logicType }) {
  if (logicType !== "logic1") return;
}

function naverPlaceLogic2({ logicType }) {
  if (logicType !== "logic2") return;
}
