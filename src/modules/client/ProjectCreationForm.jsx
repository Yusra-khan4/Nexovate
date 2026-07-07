import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
  submitProjectWizard,
  saveQuestionnaire,
  generateScope,
  downloadScopePdf,
} from "../../services/api.js";
export default function ProjectCreationForm() {
  const navigate = useNavigate();
  const [questionnaireId, setQuestionnaireId] = useState(null);
const [scopeId, setScopeId] = useState(null);
const [scopeText, setScopeText] = useState("");
const [generatedScope, setGeneratedScope] = useState(null);

  const [projectId, setProjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('form');
  const [formSubStep, setFormSubStep] = useState(1); 

  const [projectName, setProjectName] = useState('');
  const [category, setCategory] = useState('Website');
  const [specifyOtherCategory, setSpecifyOtherCategory] = useState('');
  const [tagline, setTagline] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  
  const [budgetRange, setBudgetRange] = useState('Rs. 50k - 100k');
  const [specifyOtherBudget, setSpecifyOtherBudget] = useState('');
  
  const [timelineExpectation, setTimelineExpectation] = useState('3-6 months');
  const [specifyOtherTimeline, setSpecifyOtherTimeline] = useState('');

  const [qaStep, setQaStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    if (currentStep === 'ai-chat' && qaStep === 1) {
      setSelectedOption(projectName || "bon apetite");
    }
  }, [currentStep, qaStep, projectName]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (formSubStep === 1) {
      if (!projectName.trim()) return;
      setFormSubStep(2);
    } else if (formSubStep === 2) {
      if (!projectDescription.trim()) return;
      setFormSubStep(3);
    } else if (formSubStep === 3) {
      setFormSubStep(4);
    } else if (formSubStep === 4) {
      try {
        setLoading(true);

        const wizardData = {
          title: projectName,
          basics: {
            category,
            specifyOtherCategory,
            tagline,
          },
          description: projectDescription,
          budget: budgetRange === "Others" ? specifyOtherBudget : budgetRange,
          timeline: timelineExpectation === "Others" ? specifyOtherTimeline : timelineExpectation,
        };

        const response = await submitProjectWizard(wizardData);
        console.log("Sending Wizard Data:", wizardData);

        setProjectId(response.projectId);
        localStorage.setItem("projectId", response.projectId);

        setCurrentStep("ai-chat");
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

const handleNextQuestion = async () => {

    if (qaStep === 2) {

        await handleGenerateScope();

        setQaStep(3);

        return;
    }

    setSelectedOption("");

    setQaStep(prev => prev + 1);

};
const handleGenerateScope = async () => {
  try {

    const questionnaire = await saveQuestionnaire({

      projectOverview: projectDescription,

      mcqAnswers: {
        projectName,
        category,
        budgetRange,
        timelineExpectation,
        tagline
      }

    });

    setQuestionnaireId(questionnaire.data.id);

    const response = await generateScope(questionnaire.data.id);

// Parse the JSON string returned by the backend
const parsedScope = response.scope.scope_text;

setScopeId(response.scope.id);
setGeneratedScope(parsedScope);
setScopeText(parsedScope.executiveSummary);

console.log("Generated Scope:", parsedScope);

  } catch (err) {
    alert(err.message);
  }
};
  const labelStyles = "block text-xs font-bold text-[#FFFFFF] tracking-wide mb-2 text-left";
  const inputStyles = "w-full max-w-md bg-[#d9d5ce]/70 placeholder-gray-600 border border-transparent rounded-[5px] py-2.5 px-3 text-xs text-black outline-none focus:border-[#DC6B0F] transition-all font-semibold text-left shadow-sm";

  if (currentStep === 'form') {
    return (
      <div className="w-full font-['Raleway',sans-serif] antialiased text-white text-left animate-fade-in select-none">
        <div className="mb-6 w-full max-w-4xl mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight mb-1 text-white">Submit a new project idea</h2>
          <p className="text-xs text-gray-400 font-medium font-sans">
            Five quick steps — then our AI engine takes it from there.
          </p>
        </div>

        <div className="flex items-center gap-12 mb-6 max-w-2xl w-full px-4 mx-auto">
          {[
            { step: 1, label: "Project Basics" },
            { step: 2, label: "Describe Idea" },
            { step: 3, label: "Budget & Timeline" },
            { step: 4, label: "Review & Submit" }
          ].map((item) => {
            const isCompletedOrActive = formSubStep >= item.step;
            return (
              <div key={item.step} className="flex flex-col items-center relative flex-1 text-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black border transition-all ${
                  isCompletedOrActive
                    ? 'bg-gradient-to-br from-[#F2A508] to-[#BD1C22] border-transparent text-white shadow-[0_0_15px_rgba(220,107,15,0.3)]'
                    : 'bg-[#1c1a17]/60 border-white/10 text-gray-400'
                }`}>
                  {item.step}
                </div>
                <span className={`text-[10px] font-bold mt-2 whitespace-nowrap ${isCompletedOrActive ? 'text-white' : 'text-gray-400'}`}>
                  {item.label}
                </span>
                {item.step < 4 && (
                  <div className="absolute top-4 left-[calc(50%+20px)] w-[calc(100%-12px)] h-[1px] bg-white/5 z-0 hidden sm:block" />
                )}
              </div>
            );
          })}
        </div>

        <div className="w-full max-w-4xl bg-[#1c1a17]/30 border border-white/10 rounded-[5px] shadow-2xl p-6 sm:p-8 relative mx-auto backdrop-blur-xl">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* SUB-STEP 1: PROJECT BASICS */}
            {formSubStep === 1 && (
              <div className="space-y-8 animate-fade-in text-left">
                <div className="bg-white px-5 py-3 rounded-[5px] mb-2 shadow-sm">
                  <h3 className="text-sm font-black tracking-wide text-black font-['Raleway']">Project Basics</h3>
                </div>
                
                <div className="border-b border-white/10 pb-2 max-w-4xl w-full" />

                <div className="space-y-1.5">
                  <label className={labelStyles}>Project name</label>
                  <input
                    type="text" required placeholder="e.g Bon Appetit restaurant app"
                    className={inputStyles} value={projectName} onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className={labelStyles}>Category</label>
                  <div className="flex flex-wrap gap-2">
                    {['Website', 'Mobile app', 'E-commerce', 'AI/Automation', 'Others'].map((cat) => (
                      <button
                        key={cat} type="button" onClick={() => setCategory(cat)}
                        className={`text-[11px] font-bold px-4 py-2 rounded-[5px] transition-all border cursor-pointer ${
                          category === cat 
                            ? 'bg-black text-white border-transparent shadow-md' 
                            : 'bg-[#d9d5ce] text-black border-transparent hover:bg-gray-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelStyles}>Specify other</label>
                  <input
                    type="text" placeholder="e.g UI/UX Design"
                    className={inputStyles} value={specifyOtherCategory} onChange={(e) => setSpecifyOtherCategory(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={labelStyles}>One-line tagline</label>
                  <input
                    type="text" placeholder="e.g Online ordering and table reservations for a mid-size restaurant"
                    className={inputStyles} value={tagline} onChange={(e) => setTagline(e.target.value)}
                  />
                </div>
              </div>
            )}

            {formSubStep === 2 && (
              <div className="space-y-5 animate-fade-in text-left">
                <div className="rounded-[5px] overflow-hidden bg-white px-6 py-3.5 border-b border-gray-200">
                  <h3 className="text-sm font-black text-black tracking-wide">Describe Idea</h3>
                </div>

                <div className="space-y-1.5">
                  <label className={labelStyles}>In your own words, what should this build do?</label>
                  <textarea
                    required rows={6}
                    placeholder="e.g We run a restaurant and want customers to order food online..."
                    className="w-full max-w-2xl bg-[#d9d5ce]/70 placeholder-gray-600 border border-transparent rounded-[5px] py-4 px-4 text-xs text-black outline-none focus:border-[#DC6B0F] transition-all font-semibold text-left resize-none leading-relaxed shadow-inner"
                    value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
              </div>
            )}

            {formSubStep === 3 && (
              <div className="space-y-5 animate-fade-in text-left">
                <div className="rounded-[5px] overflow-hidden bg-white px-6 py-3.5 border-b border-gray-200">
                  <h3 className="text-sm font-black text-black tracking-wide">Budget and Timeline</h3>
                </div>

                <div className="space-y-2">
                  <label className={labelStyles}>Budget range</label>
                  <div className="flex flex-wrap gap-2">
                    {['Rs. 20k - 50k', 'Rs. 50k - 100k', 'Rs. 100k - 150k', 'Rs. 150k - 200k', 'Others'].map((range) => (
                      <button
                        key={range} type="button" onClick={() => setBudgetRange(range)}
                        className={`text-[11px] font-bold px-4 py-2 rounded-[5px] transition-all border cursor-pointer ${
                          budgetRange === range ? 'bg-black text-white border-transparent shadow-md' : 'bg-[#d9d5ce] text-black border-transparent hover:bg-gray-300'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelStyles}>Specify other budget</label>
                  <input
                    type="text" placeholder="e.g 50k"
                    className={inputStyles} value={specifyOtherBudget} onChange={(e) => setSpecifyOtherBudget(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className={labelStyles}>Timeline expectations</label>
                  <div className="flex flex-wrap gap-2">
                    {['1-2 months', '3-6 months', 'Flexible', 'Others'].map((time) => (
                      <button
                        key={time} type="button" onClick={() => setTimelineExpectation(time)}
                        className={`text-[11px] font-bold px-4 py-2 rounded-[5px] transition-all border cursor-pointer ${
                          timelineExpectation === time ? 'bg-black text-white border-transparent shadow-md' : 'bg-[#d9d5ce] text-black border-transparent hover:bg-gray-300'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelStyles}>Specify other timeline</label>
                  <input
                    type="text" placeholder="e.g 4 months"
                    className={inputStyles} value={specifyOtherTimeline} onChange={(e) => setSpecifyOtherTimeline(e.target.value)}
                  />
                </div>
              </div>
            )}

            {formSubStep === 4 && (
              <div className="space-y-5 animate-fade-in text-left">
                <div className="rounded-[5px] overflow-hidden bg-white px-6 py-3.5 border-b border-gray-200">
                  <h3 className="text-sm font-black text-black tracking-wide">Review and Submit</h3>
                </div>

                <div className="w-full max-w-sm bg-[#d9d5ce] rounded-[5px] p-6 text-black space-y-4 shadow-xl border border-black/5">
                  <div>
                    <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider">Project Name</span>
                    <span className="text-sm font-extrabold text-black">{projectName || "Bon Appetit restaurant app"}</span>
                  </div>
                  <div className="pt-1">
                    <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider">Category</span>
                    <span className="text-xs font-extrabold text-black">{category}</span>
                  </div>
                  <div className="pt-1">
                    <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider">Budget Range</span>
                    <span className="text-xs font-extrabold text-black">{specifyOtherBudget ? `Rs. ${specifyOtherBudget}` : budgetRange}</span>
                  </div>
                  <div className="pt-1">
                    <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider">Timeline</span>
                    <span className="text-xs font-extrabold text-black">{specifyOtherTimeline ? specifyOtherTimeline : timelineExpectation}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold pt-4 border-t border-black/10 leading-tight">
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              {formSubStep > 1 ? (
                <button
                  type="button" onClick={() => setFormSubStep(prev => prev - 1)}
                  className="text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  &larr; Back
                </button>
              ) : (
                <div />
              )}
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] py-2.5 px-8 rounded-[5px] font-extrabold text-xs tracking-wider shadow-lg hover:brightness-110 active:scale-[0.98] transition-all uppercase cursor-pointer"
              >
                {loading ? "Submitting..." : formSubStep === 4 ? "Submit" : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full font-['Raleway',sans-serif] antialiased text-white text-left animate-fade-in select-none">
      <div className="mb-6 max-w-2xl mx-auto text-left">
        <h2 className="text-2xl font-extrabold tracking-tight mb-1 text-white">AI Scope Questionnaire</h2>
        <p className="text-xs text-gray-400 font-medium max-w-xl leading-relaxed">
          A few quick questions so we can size your project and suggest the right tech stack.
        </p>
      </div>

      {qaStep <= 2 && (
        <div className="flex justify-center mb-6">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] flex items-center justify-center font-black text-xs text-white shadow-md shadow-orange-950/20 animate-scale-in">
            {qaStep}
          </div>
        </div>
      )}

      <div className="w-full flex justify-center items-start">
        <div className="w-full max-w-lg bg-[#1c1a17]/30 border border-white/10 rounded-[5px] p-6 backdrop-blur-xl shadow-2xl relative">
          <div className="w-full bg-white rounded-[5px] p-8 sm:p-10 flex flex-col items-center justify-between min-h-[390px] border border-black/5 text-black shadow-inner">
            
            {qaStep === 1 && (
              <div className="w-full text-center space-y-5 flex-1 flex flex-col justify-center animate-fade-in">
                <h3 className="text-sm font-black text-black tracking-tight border-b border-gray-100 pb-4 max-w-xs mx-auto w-full">
                  What is the name of your project?
                </h3>
                
                <div className="w-full pt-2 max-w-xs mx-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedOption(projectName || "bon apetite")}
                    className={`w-full text-xs font-bold py-3 px-4 rounded-[5px] text-center tracking-wide border transition-all cursor-pointer shadow-sm ${
                      selectedOption === (projectName || "bon apetite")
                        ? 'bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white border-transparent'
                        : 'bg-black text-white hover:bg-gray-900 border-transparent'
                    }`}
                  >
                    {projectName || "bon apetite"}
                  </button>
                </div>
              </div>
            )}

            {qaStep === 2 && (
              <div className="w-full text-center space-y-4 flex-1 flex flex-col justify-center animate-fade-in">
                <h3 className="text-sm font-black text-black tracking-tight border-b border-gray-100 pb-3 max-w-xs mx-auto w-full">
                  What is the primary purpose of your project?
                </h3>
                
                <div className="w-full pt-1 max-w-xs mx-auto space-y-2">
                  {['Online store', 'Social platform', 'Restaurant web', 'Other'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedOption(option)}
                      className={`w-full text-xs font-bold py-2.5 px-4 rounded-[5px] text-center tracking-wide border transition-all cursor-pointer shadow-sm ${
                        selectedOption === option
                          ? 'border-[#DC6B0F] border-2'
                          : 'border-transparent border-2'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {qaStep === 3 && (
              <div className="w-full text-center space-y-6 flex-1 flex flex-col justify-center animate-fade-in py-2">
                <div className="border-b border-gray-100 pb-3 max-w-xs mx-auto w-full">
                  <h3 className="text-sm font-black text-black tracking-tight leading-tight">
                    Project Requirements Processed successfully
                  </h3>
                </div>

<div className="space-y-5 w-full max-w-md mx-auto">

  <h4 className="text-base font-extrabold text-center bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] bg-clip-text text-transparent">
    Recommended Tech Stack
  </h4>

  <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">

    <div className="flex justify-between items-start px-5 py-4 border-b">
      <span className="text-gray-500 font-semibold">
        Frontend
      </span>

      <span className="text-right font-bold text-gray-900 max-w-[220px]">
        {generatedScope?.techStack?.frontend || "-"}
      </span>
    </div>

    <div className="flex justify-between items-start px-5 py-4 border-b">
      <span className="text-gray-500 font-semibold">
        Backend
      </span>

      <span className="text-right font-bold text-gray-900 max-w-[220px]">
        {generatedScope?.techStack?.backend || "-"}
      </span>
    </div>

    <div className="flex justify-between items-start px-5 py-4">
      <span className="text-gray-500 font-semibold">
        Database
      </span>

      <span className="text-right font-bold text-gray-900 max-w-[220px]">
        {generatedScope?.techStack?.database || "-"}
      </span>
    </div>

  </div>

</div>

                <div className="flex items-center gap-3 w-full max-w-xs mx-auto pt-4">
                  <button
                    type="button"
                    onClick={() => downloadScopePdf(scopeId)}
                    className="flex-1 bg-gradient-to-r from-[#F2A508] to-[#DC6B0F] text-white font-extrabold text-[10px] py-3 rounded-[5px] shadow-sm hover:brightness-105 active:scale-[0.98] transition-all uppercase tracking-wider cursor-pointer text-center"
                  >
                    Download report
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/client/dashboard')}
                    className="flex-1 bg-gradient-to-r from-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[10px] py-3 rounded-[5px] shadow-sm hover:brightness-105 active:scale-[0.98] transition-all uppercase tracking-wider cursor-pointer text-center"
                  >
                    Save project
                  </button>
                </div>
              </div>
            )}

            {qaStep < 3 && (
              <div className="w-full flex justify-center pt-4 border-t border-gray-100 mt-2">
                <button 
                  type="button"
                  onClick={handleNextQuestion}
                  disabled={!selectedOption}
                  className={`font-extrabold text-xs px-12 py-2.5 rounded-[5px] shadow-md uppercase tracking-wider transition-all select-none ${
                    selectedOption 
                      ? 'bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white hover:brightness-110 active:scale-[0.98] cursor-pointer' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}