import React from "react";
import {BackgroundImage, DirectoryItemContainer, ItemBody} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage style={{
        backgroundImage: `url(${imageUrl})`
      }}/>
      <ItemBody>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </ItemBody>
    </DirectoryItemContainer>
  )
};

export default DirectoryItem;
