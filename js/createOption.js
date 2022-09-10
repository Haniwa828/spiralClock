const createOption = () => {
    const detailArea = addDetails(option, "detail", "detailArea");
    addSummary(detailArea, "色変更");

    // ラベルとインプットの場所をそれぞれ作成
    const optionBox = addDiv(detailArea, "optionBox");
    const optionTitle = addDiv(optionBox, "optionTitle");
    const optionInput = addDiv(optionBox, "optionInput");
    // オプション1個目
    addLabel(optionTitle, "backgroundImage", "背景画像", "optionContent");
    let input = addInput(optionInput, "backgroundImage", "file", null, "optionContent", "image/png, image/jpeg");
    backgroundImage(input);
    // オプション2個目
    addLabel(optionTitle, "background", "背景色", "optionContent");
    input = addInput(optionInput, "background", "color", "#ffffff", "optionContent");
    backgroundColor(input);
    // オプション3個目
    addLabel(optionTitle, "secHand", "秒針", "optionContent");
    input = addInput(optionInput, "secHand", "color", "#ff0000", "optionContent");
    backgroundColor(input);
    // オプション4個目
    addLabel(optionTitle, "minHand", "分針", "optionContent");
    input = addInput(optionInput, "minHand", "color", "#000000", "optionContent");
    backgroundColor(input);
    // オプション5個目
    addLabel(optionTitle, "hourHand", "時針", "optionContent");
    input = addInput(optionInput, "hourHand", "color", "#000000", "optionContent");
    backgroundColor(input);
    // オプション6個目
    addLabel(optionTitle, "longHandScale", "目盛り(長針)", "optionContent");
    input = addInput(optionInput, "longHandScale", "color", "#000000", "optionContent");
    backgroundColor(input);
    // オプション7個目
    addLabel(optionTitle, "shortHandScale", "目盛り(短針)", "optionContent");
    input = addInput(optionInput, "shortHandScale", "color", "#000000", "optionContent");
    backgroundColor(input);
    // オプション8個目
    addLabel(optionTitle, "longHandText", "文字(長針)", "optionContent");
    input = addInput(optionInput, "longHandText", "color", "#000000", "optionContent");
    textColor(input);
    // オプション9個目
    addLabel(optionTitle, "shortHandText", "文字(短針)", "optionContent");
    input = addInput(optionInput, "shortHandText", "color", "#000000", "optionContent");
    textColor(input);
}