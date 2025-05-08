// 权力之轮完整18个维度：每个维度包含5层等级+颜色
// The Wheel of Power has 18 complete dimensions: each dimension contains 5 levels + a base color
// 每个对象代表一个维度，每个维度包含 label（标签）、levels（五层等级）、color（基础颜色）
// Each object represents one dimension with a label, five levels, and a base color

const defaultsectors = [
  {
    label: "Gender",
    levels: [
      "12",
      "Trans/ Intersex/ Non-binary",
      "Cis-woman",
      "Cis-man (gay)",
      "12",
      "Gender",
    ],
    color: "#25aab0",
  },
  {
    label: "Sexuality",
    levels: [
      "",
      "Lesbian, Bi, Pan, Asexual",
      "Gay man",
      "Bisexual",
      "12",
      "Sexuality",
    ],
    color: "#25aab0",
  },
  {
    label: "Skin Colour",
    levels: ["", "Dark", "Brown", "Olive", "", "Skin Colour"],
    color: "#25aab0",
  },
  {
    label: "Race",
    levels: ["", "Indigenous", "Black", "Asian", "", "Race"],
    color: "#25aab0",
  },
  {
    label: "Neurodiversity",
    levels: [
      "",
      "Significant difference",
      "Moderate",
      "Mild",
      "",
      "Neurodiversity",
    ],
    color: "#25aab0",
  },
  {
    label: "Mental Health",
    levels: [
      "",
      "Vulnerable",
      "Unstable",
      "Occasionally unwell",
      " ",
      "Mental Health",
    ],
    color: "#d62828",
  },
  {
    label: "Body Size",
    levels: ["", "Large", "Above average", "Average", " ", "Body Size"],
    color: "#a4133c",
  },
  {
    label: "Formal Education",
    levels: ["", "None", "Primary", "Secondary", " ", "Formal Education"],
    color: "#81c784",
  },
  {
    label: "Education & Career",
    levels: [
      "",
      "Unemployed",
      "Casual/ hands-on",
      "Semi-professional",
      "",
      "Education & Career",
    ],
    color: "#81c784",
  },
  {
    label: "Type of Work",
    levels: [
      "",
      "Non-paid care",
      "Hands-on",
      "Support role",
      " ",
      "Type of Work",
    ],
    color: "#81c784",
  },
  {
    label: "Career Stage",
    levels: ["", "Early", "Mid", "Experienced", " ", "Career Stage"],
    color: "#81c784",
  },
  {
    label: "Access to Tech",
    levels: ["", "No access", "Limited", "Medium", " ", "Access to Tech"],
    color: "#d96d50",
  },
  {
    label: "Housing",
    levels: ["", "Homeless", "Temporary", "Renting", " ", "Housing"],
    color: "#c05050",
  },
  {
    label: "Language & Culture",
    levels: [
      "",
      "Non-English",
      "Limited English",
      "Fluent (non-native)",
      "",
      "Language & Culture",
    ],
    color: "#f28b82",
  },
  {
    label: "Citizenship",
    levels: [
      "",
      "No visa",
      "Temporary visa",
      "Permanent resident",
      "",
      "Citizenship",
    ],
    color: "#fbbc04",
  },
  {
    label: "Religion & Culture",
    levels: [
      "",
      "Not widely accepted",
      "Minority",
      "Traditionally respected",
      "",
      "Religion & Culture",
    ],
    color: "#fdd835",
  },
  {
    label: "Caregiving Duties",
    levels: [
      "",
      "Sole care",
      "Shared care",
      "Occasional support",
      "",
      "Caregiving Duties",
    ],
    color: "#fbc02d",
  },
  {
    label: "Health of Carers/ Trauma/ Addiction",
    levels: [
      "",
      "Ongoing severe",
      "Moderate ongoing",
      "Occasional",
      "",
      "Health/ Trauma/ Addiction",
    ],
    color: "#ec407a",
  },
];
export default defaultsectors;
