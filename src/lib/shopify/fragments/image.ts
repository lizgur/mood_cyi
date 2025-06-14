const imageFragment = /* GraphQL */ `
  fragment image on Image {
    url
    altText
    width
    height
    transformedSrc(maxWidth: 800, maxHeight: 800, crop: CENTER)
  }
`;

export default imageFragment;
