import { useState, useEffect } from "react";
import "./FormComponent.scss";

function FormComponent({ handleSubmit, loading }) {
  const [pageWidth, setPageWidth] = useState(
    Math.min(0.6 * window.innerWidth, 1024)
  );

  // Small business specific fields
  const [businessType, setBusinessType] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [timeConsumingTasks, setTimeConsumingTasks] = useState("");
  const [currentSoftware, setCurrentSoftware] = useState("");
  const [budgetForAI, setBudgetForAI] = useState("");

  // Dynamically adjust the width on window resize
  useEffect(() => {
    const handleResize = () => {
      setPageWidth(Math.min(0.6 * window.innerWidth, 1024));
    };

    window.addEventListener("resize", handleResize);

    // Clean up on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const businessTypes = [
    "Retail",
    "Restaurant",
    "Professional Services",
    "Healthcare",
    "Construction",
    "Manufacturing",
    "E-commerce",
    "Salon/Spa",
    "Other",
  ];

  const employeeRanges = ["1-5", "6-10", "11-25", "26-50", "51-100", "100+"];
  const revenueRanges = [
    "Under $100k",
    "$100k-$500k",
    "$500k-$1M",
    "$1M-$5M",
    "$5M+",
  ];
  const budgetRanges = [
    "Under $1k",
    "$1k-$5k",
    "$5k-$10k",
    "$10k-$25k",
    "$25k+",
  ];

  const isFormValid = () => {
    return (
      businessType &&
      employeeCount &&
      annualRevenue &&
      timeConsumingTasks &&
      budgetForAI
    );
  };

  return (
    <div className="page">
      {/* ✅ Dynamically adjust width */}
      <Link><img className="logo"></img></Link>
      <div 
        className="page_front" 
        style={{ width: `${pageWidth}px` }}
      >
        {/* ✅ Dynamically update title based on input */}
        <h1>
          {businessType
            ? `AI Advisor for ${businessType}`
            : "Small Business AI Advisor"}
        </h1>

        <p>
          {businessType
            ? `Get tailored AI recommendations for your ${businessType} business`
            : "Get tailored AI recommendations for your small business"}
        </p>

        <div className="main">
          <h2 className="main_title">Tell us about your business</h2>

          {/* ✅ Update form dynamically */}
          <div className="main_title_section">
            <div className="main_title_section_Business">
              <label className="main_title_section_Business_title">
                Business Type
              </label>
              <select
                className="main_title_section_Business_select"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              >
                <option value="">Select business type</option>
                {businessTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="main_title_section_time">
              <label className="main_title_section_employee_title">
                Number of Employees
              </label>
              <select
                className="main_title_section_employee_select"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
              >
                <option value="">Select range</option>
                {employeeRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="main_title_section_time">
              <label className="main_title_section_revenue_title">
                Annual Revenue
              </label>
              <select
                className="main_title_section_revenue_select"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(e.target.value)}
              >
                <option value="">Select range</option>
                {revenueRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div className="main_title_section_time">
              <label className="main_title_section_solutions_title">
                Budget for AI Solutions
              </label>
              <select
                className="main_title_section_solutions_select"
                value={budgetForAI}
                onChange={(e) => setBudgetForAI(e.target.value)}
              >
                <option value="">Select budget range</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="main_title_section_time">
            <label className="main_title_section_time_title">
              Most Time-Consuming Tasks
            </label>
            <textarea
              className="main_title_section_time_select"
              value={timeConsumingTasks}
              onChange={(e) => setTimeConsumingTasks(e.target.value)}
              placeholder="Describe your 3 most time-consuming business tasks"
            />
          </div>

          <div className="main_title_section_software">
            <label className="main_title_section_software_title">
              Current Software/Tools
            </label>
            <textarea
              className="main_title_section_software_title"
              value={currentSoftware}
              onChange={(e) => setCurrentSoftware(e.target.value)}
              placeholder="List software you currently use"
            />
          </div>
        </div>

        {/*  Dynamically disable button based on form validity */}
        <button
          onClick={() =>
            handleSubmit({
              businessType,
              employeeCount,
              annualRevenue,
              budgetForAI,
              timeConsumingTasks,
              currentSoftware,
            })
          }
          disabled={loading || !isFormValid()}
        >
          {loading ? "Generating Recommendations..." : "Get AI Recommendations"}
        </button>
      </div>
    </div>
  );
}

export default FormComponent;
