// 权力之轮完整18个维度：每个维度包含5层等级+颜色
// The Wheel of Power has 18 complete dimensions: each dimension contains 5 levels + a base color
// 每个对象代表一个维度，每个维度包含 label（标签）、levels（五层等级）、color（基础颜色）
// Each object represents one dimension with a label, five levels, and a base color

const defaultsectors = [
  {
    label: "Gender",
    levels: [
      "IM",
      "Trans/ Intersex/ Non-binary",
      "Cis-woman",
      "Cis-man (gay)",
      "Race",
      "Gender",
    ],
    color: "#25aab0",
  },
  {
    label: "Sexuality",
    levels: [
      "IM",
      "Lesbian, Bi, Pan, Asexual",
      "Gay man",
      "Bisexual",
      "Race",
      "Sexuality",
    ],
    color: "#25aab0",
  },
  {
    label: "Skin Colour",
    levels: ["IM", "Dark", "Brown", "Olive", "", "Skin Colour"],
    color: "#25aab0",
  },
  {
    label: "Race",
    levels: ["IM", "Indigenous", "Black", "Asian", "Race", "Race"],
    color: "#25aab0",
  },
  {
    label: "Neurodiversity",
    levels: [
      "IM",
      "Significant difference",
      "Moderate",
      "Mild",
      "Race",
      "Neurodiversity",
    ],
    color: "#25aab0",
  },
  {
    label: "Mental Health",
    levels: [
      "IM",
      "Vulnerable",
      "Unstable",
      "Occasionally unwell",
      " Race",
      "Mental Health",
    ],
    color: "#d62828",
  },
  {
    label: "Body Size",
    levels: ["IM", "Large", "Above average", "Average", " ", "Body Size"],
    color: "#a4133c",
  },
  {
    label: "Formal Education",
    levels: ["IM", "None", "Primary", "Secondary", " Race", "Formal Education"],
    color: "#81c784",
  },
  {
    label: "Education & Career",
    levels: [
      "IM",
      "Unemployed",
      "Casual/ hands-on",
      "Semi-professional",
      "Race",
      "Education & Career",
    ],
    color: "#81c784",
  },
  {
    label: "Type of Work",
    levels: [
      "IM",
      "Non-paid care",
      "Hands-on",
      "Support role",
      "Race",
      "Type of Work",
    ],
    color: "#81c784",
  },
  {
    label: "Career Stage",
    levels: ["IM", "Early", "Mid", "Experienced", "Race", "Career Stage"],
    color: "#81c784",
  },
  {
    label: "Access to Tech",
    levels: ["IM", "No access", "Limited", "Medium", " Race", "Access to Tech"],
    color: "#d96d50",
  },
  {
    label: "Housing",
    levels: ["IM", "Homeless", "Temporary", "Renting", " ", "Housing"],
    color: "#c05050",
  },
  {
    label: "Language & Culture",
    levels: [
      "IM",
      "Non-English",
      "Limited English",
      "Fluent (non-native)",
      "Race",
      "Language & Culture",
    ],
    color: "#f28b82",
  },
  {
    label: "Citizenship",
    levels: [
      "IM",
      "No visa",
      "Temporary visa",
      "Permanent resident",
      "Race",
      "Citizenship",
    ],
    color: "#fbbc04",
  },
  {
    label: "Religion & Culture",
    levels: [
      "IM",
      "Not widely accepted",
      "Minority",
      "Traditionally respected",
      "Race",
      "Religion & Culture",
    ],
    color: "#fdd835",
  },
  {
    label: "Caregiving Duties",
    levels: [
      "IM",
      "Sole care",
      "Shared care",
      "Occasional support",
      "Race",
      "Caregiving Duties",
    ],
    color: "#fbc02d",
  },
  {
    label: "Health of Carers/ Trauma/ Addiction",
    levels: [
      "IM",
      "Ongoing severe",
      "Moderate ongoing",
      "Occasional",
      "Race",
      "Health/ Trauma/ Addiction",
    ],
    color: "#ec407a",
  },
];
export default defaultsectors;
