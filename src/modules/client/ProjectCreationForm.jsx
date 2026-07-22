import React, { useState } from 'react';
import { 
  startProject, 
  generateScope, 
  regenerateScope, 
  saveScope,
  sendScopeToDeveloper,
  downloadScopePdf         
} from '../../services/api';
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Download
} from 'lucide-react';

// Helper to convert UI budget strings to pure numbers for backend
const parseBudgetToNumeric = (budgetInput) => {
  if (typeof budgetInput === 'number') return budgetInput;
  if (!budgetInput) return 0;
  const numbers = budgetInput.replace(/,/g, '').match(/\d+/g);
  if (!numbers || numbers.length === 0) return 0;
  const parsed = parseInt(numbers[numbers.length - 1], 10);
  return isNaN(parsed) ? 0 : parsed;
};

export default function ProjectCreationForm() {
  const navigate = useNavigate();

  // API State Tracking
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Database identifiers
  const [createdProjectInfo, setCreatedProjectInfo] = useState(null); // { projectId, questionnaireId }
  const [savedScopeRecord, setSavedScopeRecord] = useState(null);     // Holds response from save-scope ({ id: 23, ... })
  const [generatedScope, setGeneratedScope] = useState(null);        // AI generated scope object

  const [dashboardView, setDashboardView] = useState('main');
  const [currentStep, setCurrentStep] = useState(1);        
  const [projectNameInput, setProjectNameInput] = useState('Bon Appetit restaurant app');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);  
  const [selectedPurpose, setSelectedPurpose] = useState('Restaurant web');
  const [customPurposeInput, setCustomPurposeInput] = useState('');
  const [projectDescription, setProjectDescription] = useState(
    "I run a small restaurant and want an app where customers can browse our menu, place orders for delivery or pickup, and pay online with a card or wallet. I also need a simple staff-facing dashboard to see incoming orders in real time and mark them as preparing, ready, or delivered. Eventually I'd like loyalty points for repeat customers."
  );
  const [projectBudget, setProjectBudget] = useState('$1,000 - $3,000');
  const [customBudgetInput, setCustomBudgetInput] = useState('');

  const [regenerationPrompt, setRegenerationPrompt] = useState('');
  const [activePlatform, setActivePlatform] = useState('Desktop'); 
  const [colorIndex, setColorIndex] = useState(0);
  const colorSchemes = [
    { primary: 'bg-[#007acc]', secondary: 'bg-[#005c99]', accent: 'bg-[#0099ff]' }, 
    { primary: 'bg-[#10b981]', secondary: 'bg-[#047857]', accent: 'bg-[#34d399]' }, 
    { primary: 'bg-[#8b5cf6]', secondary: 'bg-[#6d28d9]', accent: 'bg-[#a78bfa]' }, 
  ];

  const persistScopeToDatabase = async (qId, scopeObj) => {
    setLoadingMessage('Saving scope record...');
    const saveRes = await saveScope(qId, scopeObj);
    const extractedId = saveRes?.scope?.id || saveRes?.id || saveRes?.scopeId;

    if (saveRes?.success && extractedId) {
      const scopeDataWithId = { ...saveRes.scope, id: extractedId };
      setSavedScopeRecord(scopeDataWithId); 
      return scopeDataWithId;
    } else {
      throw new Error(saveRes?.message || 'Failed to save scope to database.');
    }
  };

  // =========================================================================
  // GENERATION FLOW (Start Project -> Generate Scope -> Save Scope)
  // =========================================================================
  const handleNextStep = async () => {
    setErrorMessage('');

    if (currentStep === 1 && !projectNameInput.trim()) {
      setErrorMessage('Please enter a project name.');
      return;
    }

    if (currentStep === 2) {
      if (selectedPurpose === 'Other' && !customPurposeInput.trim()) {
        setErrorMessage('Please specify your custom project purpose.');
        return;
      }
    }

    if (currentStep === 3) {
      if (!projectDescription.trim()) {
        setErrorMessage('Please provide a project description.');
        return;
      }
    }

    if (currentStep === 4) {
      if (projectBudget === 'Custom' && !customBudgetInput.trim()) {
        setErrorMessage('Please enter your custom budget amount.');
        return;
      }

      const purposeValue = selectedPurpose === 'Other' ? customPurposeInput : selectedPurpose;
      const rawBudget = projectBudget === 'Custom' ? customBudgetInput : projectBudget;
      const numericBudget = parseBudgetToNumeric(rawBudget);

      try {
        setLoading(true);
        setLoadingMessage('Initializing project...');
        
        const startRes = await startProject({
          projectName: projectNameInput,
          purpose: purposeValue,
          projectOverview: projectDescription,
          budget: numericBudget
        });

        if (!startRes?.success || !startRes?.questionnaireId) {
          throw new Error(startRes?.message || 'Failed to initialize project.');
        }

        const qId = startRes.questionnaireId;
        setCreatedProjectInfo({
          projectId: startRes.projectId,
          questionnaireId: qId
        });
        
        setLoadingMessage('AI is generating scope document...');
        const scopeRes = await generateScope(qId);

        if (!scopeRes?.success || !scopeRes?.scope) {
          throw new Error(scopeRes?.message || 'Failed to generate scope.');
        }

        setGeneratedScope(scopeRes.scope);

        await persistScopeToDatabase(qId, scopeRes.scope);
        setCurrentStep(5);

      } catch (err) {
        setErrorMessage(err.message || 'Error executing scope pipeline.');
      } finally {
        setLoading(false);
        setLoadingMessage('');
      }
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleRegenerateScope = async () => {
    setErrorMessage('');

    if (!regenerationPrompt.trim()) {
      setErrorMessage('Please enter your feedback before regenerating.');
      return;
    }

    if (!createdProjectInfo?.questionnaireId) {
      setErrorMessage('Missing Questionnaire ID. Please restart.');
      return;
    }

    try {
      setLoading(true);
      setLoadingMessage('Updating scope based on feedback...');
      const res = await regenerateScope(createdProjectInfo.questionnaireId, regenerationPrompt);

      if (!res?.success || !res?.scope) {
        throw new Error(res?.message || 'Failed to regenerate scope.');
      }

      setGeneratedScope(res.scope);
      await persistScopeToDatabase(createdProjectInfo.questionnaireId, res.scope);

      setRegenerationPrompt('');
      setCurrentStep(5); 
    } catch (err) {
      setErrorMessage(err.message || 'Error regenerating scope document.');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleSendToDeveloper = async () => {
    setErrorMessage('');

    if (!savedScopeRecord?.id) {
      setErrorMessage('Scope not saved in database yet. Please regenerate or re-submit.');
      return;
    }

    try {
      setLoading(true);
      setLoadingMessage('Routing to developer system...');

      const res = await sendScopeToDeveloper(savedScopeRecord.id, 99);

      if (res?.success) {
        setShowReviewModal(true);
      } else {
        throw new Error(res?.message || 'Failed to send to developer.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error sending scope to developer.');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  const handleDownloadPdf = async () => {
    if (!savedScopeRecord?.id) {
      setErrorMessage('No saved scope ID found for download.');
      return;
    }

    try {
      setLoading(true);
      setLoadingMessage('Preparing PDF download...');
      await downloadScopePdf(savedScopeRecord.id);
      setShowDownloadModal(false);
    } catch (err) {
      setErrorMessage(err.message || 'Error downloading PDF.');
    } finally {
      setLoading(false);
      setLoadingMessage('');
    }
  };

  // =========================================================================
  // STATE VIEW 1: SAMPLE UI SCHEME VIEWER
  // =========================================================================
  if (dashboardView === 'sample-ui') {
    const currentTheme = colorSchemes[colorIndex];

    return (
      <div className="w-full max-w-5xl mx-auto min-h-[calc(100vh-180px)] flex flex-col items-center justify-start pt-6 font-['Raleway',sans-serif] select-none text-gray-900 dark:text-white transition-colors duration-300 relative">
        <div className="w-full text-left mb-8 space-y-1">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">
              Sample UI
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            UI samples for your project.
          </p>
        </div>                        

        <div className="p-0 dark:p-8 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/10 dark:backdrop-blur-md transition-all duration-300 w-full max-w-2xl mx-auto relative">
          <div className="bg-[#FFF6E9] dark:bg-white text-black p-8 rounded-[12px] border border-black/5 dark:border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-2xl flex flex-col min-h-[490px] relative transition-all duration-300">
            <div className="text-left mb-2">
              <h3 className="text-sm font-black text-gray-900 capitalize tracking-wide">{projectNameInput || "Bon appetit"}</h3>
            </div>

            <div className="text-center mb-4">
              <span className="text-[11px] font-extrabold text-gray-600 uppercase tracking-widest">Sample UI</span>
            </div>

            <div className="flex items-center justify-center gap-16 border-b border-gray-300/60 pb-3 mb-6 max-w-sm mx-auto w-full">
              {['Desktop', 'Mobile'].map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => setActivePlatform(platform)}
                  className="relative pb-1 text-xs font-black tracking-wide text-gray-800 cursor-pointer transition-all"
                >
                  {platform}
                  {activePlatform === platform && (
                    <div className="absolute bottom-[-13px] left-1/2 -translate-x-1/2 w-20 h-[3px] bg-gradient-to-r from-[#F2A508] to-[#BD1C22]" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex-1 flex items-center justify-between gap-4 relative">
              <button
                type="button"
                onClick={() => setColorIndex(prev => (prev - 1 + colorSchemes.length) % colorSchemes.length)}
                className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shadow-md hover:bg-gray-900 active:scale-90 transition-all shrink-0 cursor-pointer"
              >
                <ChevronLeft size={16} strokeWidth={3} />
              </button>

              <div className="flex-1 max-h-[310px] overflow-y-auto pr-3 custom-scrollbar space-y-6 flex flex-col items-center">
                {activePlatform === 'Desktop' ? (
                  <>
                    <div className="w-full bg-black rounded-[4px] p-3 flex gap-3 h-28 shrink-0 relative shadow-md">
                      <div className={`w-8 h-full rounded-[2px] ${currentTheme.secondary} transition-colors duration-300`} />
                      <div className="flex-1 flex flex-col gap-2">
                        <div className={`w-28 h-2 rounded-full ${currentTheme.accent} transition-colors duration-300`} />
                        <div className={`w-full flex-1 rounded-[2px] ${currentTheme.primary} transition-colors duration-300`} />
                        <div className="flex gap-2 h-6 w-full">
                          <div className={`flex-1 rounded-[2px] ${currentTheme.secondary} transition-colors duration-300`} />
                          <div className={`w-12 rounded-[2px] ${currentTheme.accent} transition-colors duration-300`} />
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-black rounded-[4px] p-3 flex gap-3 h-28 shrink-0 relative shadow-md">
                      <div className="flex-1 flex flex-col gap-2">
                        <div className={`w-20 h-2 rounded-full ${currentTheme.accent} transition-colors duration-300`} />
                        <div className="grid grid-cols-3 gap-2 flex-1 w-full">
                          <div className={`rounded-[2px] ${currentTheme.primary} transition-colors duration-300`} />
                          <div className={`rounded-[2px] ${currentTheme.secondary} transition-colors duration-300`} />
                          <div className={`rounded-[2px] ${currentTheme.accent} transition-colors duration-300`} />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-[160px] bg-black rounded-[4px] p-3 flex flex-col gap-2.5 h-44 shrink-0 shadow-md">
                      <div className={`w-12 h-1.5 rounded-full ${currentTheme.accent} transition-colors duration-300 mx-auto`} />
                      <div className={`w-full flex-1 rounded-[2px] ${currentTheme.primary} transition-colors duration-300`} />
                      <div className="flex gap-1.5 h-6 w-full">
                        <div className={`flex-1 rounded-[2px] ${currentTheme.secondary} transition-colors duration-300`} />
                        <div className={`flex-1 rounded-[2px] ${currentTheme.accent} transition-colors duration-300`} />
                      </div>
                    </div>

                    <div className="w-[160px] bg-black rounded-[4px] p-3 flex flex-col gap-2 h-36 shrink-0 shadow-md">
                      <div className={`w-full h-8 rounded-[2px] ${currentTheme.secondary} transition-colors duration-300`} />
                      <div className={`w-full flex-1 rounded-[2px] ${currentTheme.primary} transition-colors duration-300`} />
                    </div>
                  </>
                )}

                <div className="pt-2 pb-1 w-full flex justify-center shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowDownloadModal(true)}
                    className="bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white text-xs font-extrabold px-10 py-2.5 rounded-[4px] transition-all cursor-pointer shadow-md hover:brightness-105 active:scale-[0.98]"
                  >
                    Select
                  </button>
                </div>
              </div>

              <div className="w-1.5 bg-gray-300/80 rounded-full h-[200px] relative overflow-hidden shrink-0 flex flex-col items-center">
                <div className="w-full h-14 bg-gray-600 rounded-full absolute top-14 shadow" />
              </div>

              <button
                type="button"
                onClick={() => setColorIndex(prev => (prev + 1) % colorSchemes.length)}
                className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shadow-md hover:bg-gray-900 active:scale-90 transition-all shrink-0 cursor-pointer"
              >
                <ChevronRight size={16} strokeWidth={3} />
              </button>
            </div>

            <div className="mt-4 pt-1 text-center text-[10px] font-bold text-gray-400 select-none uppercase tracking-wide">
              Theme Variant {colorIndex + 1} of {colorSchemes.length}
            </div>
          </div>
        </div>

        {/* DOWNLOAD PDF MODAL */}
        {showDownloadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="absolute inset-0 cursor-pointer" onClick={() => setShowDownloadModal(false)} />
            <div className="bg-[#FFF6E9] rounded-[12px] p-8 max-w-sm w-full relative z-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border border-black/5 flex flex-col items-center text-center">
              <div className="relative mb-5 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-700/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-800 flex items-center justify-center shadow-md">
                    <CheckCircle2 size={36} className="text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              <div className="space-y-6 w-full">
                <h3 className="text-xl font-black text-black tracking-tight leading-tight">
                  Your scope document PDF is ready
                </h3>
                <button 
                  type="button"
                  disabled={loading}
                  onClick={handleDownloadPdf}
                  className="w-full bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-xs py-3 rounded-[5px] shadow-md hover:brightness-105 active:scale-[0.99] transition-all tracking-wide flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Downloading...</span>
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // STATE VIEW 2: MULTI-STEP SCOPE CONFIGURATOR GENERATOR
  // =========================================================================
  return (
    <div className="w-full max-w-5xl mx-auto min-h-[calc(100vh-180px)] flex flex-col items-center justify-start pt-6 font-['Raleway',sans-serif] select-none text-white transition-colors duration-300 relative">
      <div className="w-full text-left mb-10 space-y-1">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors">
          Submit a new project idea
        </h2>
        <p className="text-xs text-gray-600 font-medium tracking-wide">
          Five quick steps - then your project report will be generated.
        </p>
      </div>
      {currentStep < 5 && (
        <div className="mb-6 flex justify-center">
          <div className="w-11 h-11 bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-md">
            {currentStep}
          </div>
        </div>
      )}                        

      <div className="p-0 dark:p-8 rounded-[12px] bg-transparent dark:bg-white/10 border border-transparent dark:border-white/10 dark:backdrop-blur-md transition-all duration-300 mt-4 w-full max-w-[460px] mx-auto">
        <div className="bg-[#FFF6E9] dark:bg-white text-black p-8 rounded-[12px] border border-black/5 dark:border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-2xl flex flex-col min-h-[360px] justify-between transition-colors duration-300">
          
          {/* Error Banner Notification */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 text-xs rounded-[4px] font-bold text-center">
              {errorMessage}
            </div>
          )}

          {/* STEP 5: PROCESSED SCOPE SUMMARY RESULTS */}
          {currentStep === 5 && (
            <div className="flex-1 flex flex-col justify-between">
              <div className="text-center border-b border-gray-200 pb-4 mb-5">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight max-w-[280px] mx-auto leading-tight">
                  Project Requirements Processed successfully
                </h3>
                {savedScopeRecord?.id && (
                  <p className="text-[10px] text-gray-400 font-bold mt-1">
                    Questionnaire ID: #{createdProjectInfo?.questionnaireId} | Scope DB ID: #{savedScopeRecord.id}
                  </p>
                )}
              </div>

              <div className="space-y-4 my-auto">
                <h4 className="text-sm font-black tracking-wide text-center bg-gradient-to-r from-[#F2A508] to-[#BD1C22] bg-clip-text text-transparent">
                  Recommended TechStack & Scope
                </h4>
                
                {generatedScope?.executiveSummary ? (
                  <div className="max-h-36 overflow-y-auto p-3 bg-gray-50 rounded text-left text-[11px] text-gray-700 leading-relaxed font-sans custom-scrollbar border border-gray-200/60 shadow-inner">
                    <p className="font-semibold text-gray-900 mb-1">Executive Summary:</p>
                    {generatedScope.executiveSummary}
                  </div>
                ) : (
                  <div className="space-y-2.5 max-w-[240px] mx-auto font-sans text-xs">
                    <div className="flex justify-start gap-1 font-bold text-gray-900">
                      <span>Frontend :</span>
                      <span className="text-gray-500 font-medium">React.js</span>
                    </div>
                    <div className="flex justify-start gap-1 font-bold text-gray-900">
                      <span>Backend :</span>
                      <span className="text-gray-500 font-medium">Django</span>
                    </div>
                    <div className="flex justify-start gap-1 font-bold text-gray-900">
                      <span>Database :</span>
                      <span className="text-gray-500 font-medium">MongoDB</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 space-y-3 shrink-0 flex flex-col items-center">
                <div className="flex items-center gap-3 w-full justify-center">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setDashboardView('sample-ui')}
                    className="flex-1 max-w-[140px] bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[10px] py-2 rounded-[4px] shadow hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                  >
                    Sample UI
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setErrorMessage('');
                      setCurrentStep(6);
                    }}
                    className="flex-1 max-w-[140px] bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[10px] py-2 rounded-[4px] shadow hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                  >
                    Regenerate
                  </button>
                </div>
                
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleSendToDeveloper}
                  className="w-full max-w-[160px] bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-[10px] py-2 rounded-[4px] shadow hover:brightness-105 active:scale-[0.98] transition-all uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    'Send to developer'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: REGENERATION TEXTAREA */}
          {currentStep === 6 && (
            <div className="flex-1 flex flex-col justify-between">
              <div className="text-left border-b border-gray-200 pb-3.5 mb-6">
                <h3 className="text-base font-black text-gray-900 tracking-tight max-w-[280px] leading-tight">
                  Add your requirements to regenerate
                </h3>
              </div>

              <div className="w-full flex-1 flex flex-col justify-start">
                <textarea 
                  rows={6}
                  value={regenerationPrompt}
                  onChange={(e) => setRegenerationPrompt(e.target.value)}
                  placeholder="Describe the changes you'd like to make before regenerating the report (e.g. Change backend runtime to NestJS with TypeScript)." 
                  className="w-full bg-[#000000] text-[#FFFFFF] rounded-[4px] p-4 text-xs font-bold placeholder-gray-400 outline-none resize-none leading-relaxed shadow-inner"
                  required
                />
              </div>

              <div className="mt-8 space-y-3 shrink-0 flex flex-col items-center">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleRegenerateScope}
                  className="w-44 bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-white font-extrabold text-xs py-2.5 rounded-[4px] shadow-md hover:brightness-105 active:scale-[0.99] transition-all tracking-wide cursor-pointer text-center flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>{loadingMessage || 'Regenerating...'}</span>
                    </>
                  ) : (
                    'Regenerate'
                  )}
                </button>
                {!loading && (
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage('');
                      setCurrentStep(5);
                    }}
                    className="text-[10px] font-black tracking-wider text-gray-400 hover:text-gray-600 uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEPS 1 to 4: MAIN FORM INPUTS */}
          {currentStep < 5 && (
            <>
              <h3 className="text-sm font-black text-gray-900 tracking-tight border-b border-gray-200/80 pb-3.5 text-left mb-6 leading-snug">
                {currentStep === 1 && "What is the name of your project?"}
                {currentStep === 2 && "What is the primary purpose of your project?"}
                {currentStep === 3 && "Describe your project"}
                {currentStep === 4 && "What is your estimated budget?"}
              </h3>
              
              <div className="w-full flex-1 flex flex-col justify-start space-y-2.5">
                {currentStep === 1 && (
                  <input 
                    type="text" 
                    value={projectNameInput}
                    onChange={(e) => setProjectNameInput(e.target.value)}
                    className="w-full bg-[#000000] text-[#FFFFFF] rounded-[4px] py-3 px-4 text-xs font-bold text-center outline-none shadow-md"
                  />
                )}

                {currentStep === 2 && (
                  <div className="space-y-2.5">
                    {['Online store', 'Social platform', 'Restaurant web', 'Other'].map(opt => (
                      <button 
                        key={opt} 
                        type="button" 
                        onClick={() => setSelectedPurpose(opt)} 
                        className={`w-full text-center text-xs font-bold py-3 px-4 rounded-[4px] shadow-md transition-all duration-200 cursor-pointer text-white ${
                          selectedPurpose === opt ? 'bg-black ring-2 ring-orange-500 scale-[1.01]' : 'bg-black hover:bg-gray-900'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                    {selectedPurpose === 'Other' && (
                      <div className="pt-1.5 animate-fade-in">
                        <input 
                          type="text" 
                          value={customPurposeInput}
                          onChange={(e) => setCustomPurposeInput(e.target.value)}
                          placeholder="Enter your custom answer" 
                          className="w-full bg-black text-white border-2 border-gray-600/50 rounded-[4px] py-3 px-4 text-xs font-bold placeholder-gray-500 outline-none shadow-inner"
                        />
                      </div>
                    )}
                  </div>
                )}

                {currentStep === 3 && (
                  <textarea 
                    rows={8}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full bg-[#000000] text-[#FFFFFF] rounded-[4px] p-4 text-xs font-bold outline-none resize-none leading-relaxed shadow-md"
                  />
                )}

                {currentStep === 4 && (
                  <div className="space-y-2.5">
                    {['Under $1,000', '$1,000 - $3,000', '$3,000 - $5,000', '$5,000+', 'Custom'].map(bOpt => (
                      <button 
                        key={bOpt} 
                        type="button" 
                        onClick={() => setProjectBudget(bOpt)} 
                        className={`w-full text-center text-xs font-bold py-3 px-4 rounded-[4px] shadow-md transition-all duration-200 cursor-pointer text-white ${
                          projectBudget === bOpt ? 'bg-black ring-2 ring-orange-500 scale-[1.01]' : 'bg-black hover:bg-gray-900'
                        }`}
                      >
                        {bOpt}
                      </button>
                    ))}
                    {projectBudget === 'Custom' && (
                      <div className="pt-1.5 animate-fade-in">
                        <input 
                          type="text" 
                          value={customBudgetInput}
                          onChange={(e) => setCustomBudgetInput(e.target.value)}
                          placeholder="e.g. $2,500 PKR / USD" 
                          className="w-full bg-black text-white border-2 border-gray-600/50 rounded-[4px] py-3 px-4 text-xs font-bold placeholder-gray-500 outline-none shadow-inner text-center"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col items-center gap-3 w-full shrink-0">
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleNextStep}
                  className="w-full max-w-[240px] bg-gradient-to-r from-[#F2A508] via-[#DC6B0F] to-[#BD1C22] text-[#FFFFFF] font-extrabold text-xs py-2.5 rounded-[4px] shadow-md text-center cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 hover:brightness-105 active:scale-[0.99] transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>{loadingMessage || 'Processing...'}</span>
                    </>
                  ) : (
                    currentStep === 4 ? 'Generate scope document' : 'Next'
                  )}
                </button>

                {currentStep > 1 && !loading && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setErrorMessage('');
                      setCurrentStep(prev => prev - 1);
                    }} 
                    className="text-[11px] font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider cursor-pointer"
                  >
                    Back
                  </button>
                )}
              </div>
            </>
          )}

        </div>
      </div>

      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-0 cursor-pointer" onClick={() => { setShowReviewModal(false); navigate('/client/dashboard'); }} />
          <div className="bg-[#FFF6E9] rounded-[12px] p-8 max-w-lg w-full relative z-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border border-black/5 flex flex-col items-center text-center">
            <div className="relative mb-6 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-emerald-700/20 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-800 flex items-center justify-center shadow-md">
                  <CheckCircle2 size={44} className="text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <div className="space-y-3 max-w-sm">
              <h3 className="text-xl font-black text-black tracking-tight leading-tight">Your project has been sent for review</h3>
              <p className="text-xs text-gray-600 font-semibold font-sans leading-relaxed tracking-wide">Nexovate's admin team will review your scope document, requirements, and estimated budget. Once approved, your project will be posted to the Developer Portal and you'll be notified.</p>
            </div>
            <button onClick={() => { setShowReviewModal(false); navigate('/client/dashboard'); }} className="mt-6 text-[10px] uppercase font-black tracking-widest text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">Close Window</button>
          </div>
        </div>
      )}

    </div>
  );
}