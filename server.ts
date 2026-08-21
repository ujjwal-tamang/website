import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini API client
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "online",
      timestamp: new Date().toISOString(),
      service: "Ujjwal Tamang SOC Portfolio API",
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Helper heuristic fallback analysis generator
  const generateHeuristicAnalysis = (rawLog: string, incidentType?: string, _contextNotes?: string) => {
    const logLower = rawLog.toLowerCase();

    let severity = "MEDIUM";
    let threatName = "Uncategorized Telemetry Anomaly";
    let mitreTechniques = ["T1059 - Command and Scripting Interpreter"];
    let executiveSummary = "Suspicious activity detected within the provided security log payload.";
    let rootCauseAnalysis = "An unverified or anomalous request vector was captured in the telemetry feed.";
    let containmentPlaybook = [
      "Isolate affected source IP / host from the network segment.",
      "Review perimeter firewall and WAF audit logs for related queries.",
      "Initiate credential rotation for any potentially exposed accounts.",
      "Perform endpoint memory scan and review process execution history."
    ];
    let detectionRuleDraft = `rule Detect_Suspicious_Telemetry {\n  meta:\n    author = "Ujjwal Tamang SOC Co-Pilot"\n    severity = "Medium"\n  strings:\n    $s1 = "${rawLog.slice(0, 30).replace(/["\\]/g, '')}"\n  condition:\n    $s1\n}`;

    if (logLower.includes("union select") || logLower.includes("drop table") || logLower.includes("1=1") || logLower.includes("information_schema")) {
      severity = "CRITICAL";
      threatName = "SQL Injection (SQLi) Exploitation Attempt";
      mitreTechniques = ["T1190 - Exploit Public-Facing Application", "T1505 - Server Software Component"];
      executiveSummary = "An attacker submitted malicious SQL statements within HTTP parameters attempting to bypass authentication or extract backend database schemas.";
      rootCauseAnalysis = "Lack of parameterization or input sanitization on database query endpoints allowed raw SQL syntax injection.";
      containmentPlaybook = [
        "Block source IP address on WAF and perimeter firewalls immediately.",
        "Patch vulnerable database endpoint to use parameterized prepared statements.",
        "Inspect database access logs to verify whether unauthorized data extraction occurred.",
        "Rotate database credentials and verify read-only database permissions."
      ];
      detectionRuleDraft = `rule Detect_SQL_Injection {\n  meta:\n    description = "Detects UNION SELECT and SQL comment injections"\n    author = "SOC Co-Pilot"\n  strings:\n    $s1 = "UNION SELECT" nocase\n    $s2 = "information_schema" nocase\n  condition:\n    any of them\n}`;
    } else if (logLower.includes("<script>") || logLower.includes("javascript:") || logLower.includes("onerror=") || logLower.includes("onload=")) {
      severity = "HIGH";
      threatName = "Cross-Site Scripting (XSS) Attack";
      mitreTechniques = ["T1189 - Drive-by Compromise", "T1059.007 - JavaScript"];
      executiveSummary = "Script tags or inline event handlers were injected into request parameters, aimed at executing arbitrary JavaScript in victim browser contexts.";
      rootCauseAnalysis = "Target input fields lack strict output encoding and Content Security Policy (CSP) enforcement.";
      containmentPlaybook = [
        "Sanitize input parameters and enforce contextual HTML/JS output encoding.",
        "Implement a strict Content Security Policy (CSP) header prohibiting inline scripts.",
        "Invalidate active user session tokens potentially compromised via XSS payload."
      ];
      detectionRuleDraft = `rule Detect_XSS_Payload {\n  meta:\n    description = "Detects inline script tags and event handlers"\n  strings:\n    $s1 = "<script>" nocase\n    $s2 = "onerror=" nocase\n  condition:\n    any of them\n}`;
    } else if (logLower.includes("failed password") || logLower.includes("authentication failure") || logLower.includes("invalid user") || logLower.includes("401 unauthorized")) {
      severity = "HIGH";
      threatName = "Credential Stuffing / SSH Brute Force";
      mitreTechniques = ["T1110.001 - Brute Force: Password Guessing", "T1078 - Valid Accounts"];
      executiveSummary = "High-frequency authentication failures observed from remote host, indicating automated brute force or credential dictionary attack.";
      rootCauseAnalysis = "Exposed authentication interface without rate limiting or fail2ban IP lockout rules enabled.";
      containmentPlaybook = [
        "Enforce automatic IP lockout via Fail2ban or WAF after 5 failed authentication attempts.",
        "Mandate Multi-Factor Authentication (MFA) and SSH public key authentication.",
        "Check active logins to confirm no single attempt succeeded during the attack window."
      ];
      detectionRuleDraft = `rule Detect_Brute_Force {\n  meta:\n    description = "Detects rapid SSH or web login failures"\n  strings:\n    $s1 = "Failed password" nocase\n  condition:\n    $s1\n}`;
    } else if (logLower.includes("etc/passwd") || logLower.includes("cmd.exe") || logLower.includes("powershell") || logLower.includes("base64") || logLower.includes("system32") || logLower.includes("nc -e")) {
      severity = "CRITICAL";
      threatName = "Directory Traversal / Remote Code Execution (RCE)";
      mitreTechniques = ["T1059.001 - PowerShell", "T1083 - File and Directory Discovery", "T1059.004 - Unix Shell"];
      executiveSummary = "Execution of system binaries, directory traversal sequences, or encoded shell commands identified in request parameters.";
      rootCauseAnalysis = "Insecure file path concatenation or un-sanitized command execution functions (eval, system, exec).";
      containmentPlaybook = [
        "Isolate the web server host node immediately to prevent lateral movement.",
        "Review process trees for spawned subprocesses (nc, bash, powershell, cmd).",
        "Kill unauthorized active network sockets and perform forensic disk imaging."
      ];
      detectionRuleDraft = `rule Detect_RCE_Traversal {\n  meta:\n    description = "Detects path traversal and web shell invocations"\n  strings:\n    $s1 = "/etc/passwd"\n    $s2 = "cmd.exe"\n    $s3 = "powershell -enc"\n  condition:\n    any of them\n}`;
    }

    if (incidentType && incidentType !== "General Assessment") {
      threatName = `${incidentType} - ${threatName}`;
    }

    return {
      severity,
      threatName,
      mitreTechniques,
      executiveSummary,
      rootCauseAnalysis,
      containmentPlaybook,
      detectionRuleDraft
    };
  };

  // AI Security Log / Incident Analyzer Endpoint
  app.post("/api/analyze-incident", async (req, res) => {
    try {
      const { rawLog, incidentType, contextNotes } = req.body;

      if (!rawLog || typeof rawLog !== "string") {
        return res.status(400).json({ error: "rawLog string parameter is required" });
      }

      const ai = getGeminiClient();
      if (!ai) {
        // Fallback to heuristic analysis if API key is not configured
        const fallbackAnalysis = generateHeuristicAnalysis(rawLog, incidentType, contextNotes);
        return res.json({
          success: true,
          analysis: fallbackAnalysis,
          analyzedAt: new Date().toISOString(),
          isFallback: true,
          note: "Analyzed using local SOC heuristic engine."
        });
      }

      const systemInstruction = `You are an elite Senior SOC Lead Analyst and Incident Response Commander assisting Ujjwal Tamang (CEH & SOC Analyst).
Analyze security log entries, HTTP payloads, stack traces, network captures, or suspicious code snippets provided by the user.
Provide a precise, authoritative, structured JSON cybersecurity assessment following MITRE ATT&CK standards.`;

      const prompt = `Analyze the following security telemetry / log snippet:
Incident Category/Tag: ${incidentType || "General Assessment"}
User Context Notes: ${contextNotes || "None provided"}

RAW LOG / DATA:
\`\`\`
${rawLog}
\`\`\`

Return a structured JSON object containing:
1. severity: String ("CRITICAL", "HIGH", "MEDIUM", "LOW", or "INFORMATIONAL")
2. threatName: Short clear title for the threat
3. mitreTechniques: Array of strings (e.g. ["T1190 - Exploit Public-Facing Application", "T1059.006 - Python"])
4. executiveSummary: Concise 2-3 sentence overview of what happened
5. rootCauseAnalysis: Technical breakdown of attack vector, payload structure, and potential impact
6. containmentPlaybook: Array of actionable 3-5 immediate containment steps for the SOC team
7. detectionRuleDraft: A short YARA, Sigma, or Snort rule draft string to detect this pattern in the future`;

      const candidateModels = ["gemini-3.6-flash", "gemini-flash-latest"];
      let lastError: any = null;
      let parsedData: any = null;

      for (const model of candidateModels) {
        // Up to 2 retry attempts per candidate model
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            const response = await ai.models.generateContent({
              model,
              contents: prompt,
              config: {
                systemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.OBJECT,
                  properties: {
                    severity: { type: Type.STRING },
                    threatName: { type: Type.STRING },
                    mitreTechniques: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    executiveSummary: { type: Type.STRING },
                    rootCauseAnalysis: { type: Type.STRING },
                    containmentPlaybook: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    detectionRuleDraft: { type: Type.STRING },
                  },
                  required: [
                    "severity",
                    "threatName",
                    "mitreTechniques",
                    "executiveSummary",
                    "rootCauseAnalysis",
                    "containmentPlaybook",
                    "detectionRuleDraft",
                  ],
                },
              },
            });

            const jsonText = response.text || "{}";
            parsedData = JSON.parse(jsonText);
            if (parsedData && parsedData.severity) {
              break;
            }
          } catch (err: any) {
            lastError = err;
            console.warn(`Model ${model} attempt ${attempt} failed:`, err?.message || err);
            // Brief pause before retry
            await new Promise((resolve) => setTimeout(resolve, 600));
          }
        }
        if (parsedData && parsedData.severity) {
          break;
        }
      }

      if (parsedData && parsedData.severity) {
        return res.json({
          success: true,
          analysis: parsedData,
          analyzedAt: new Date().toISOString(),
        });
      }

      // If all Gemini API calls failed (e.g., due to 503 high demand), return heuristic fallback analysis
      console.warn("All Gemini model attempts failed, using SOC heuristic engine fallback. Last error:", lastError?.message || lastError);
      const fallbackData = generateHeuristicAnalysis(rawLog, incidentType, contextNotes);
      return res.json({
        success: true,
        analysis: fallbackData,
        analyzedAt: new Date().toISOString(),
        isFallback: true,
      });

    } catch (err: any) {
      console.error("Incident analysis unexpected error:", err);
      // Even in case of unexpected errors, provide heuristic fallback
      try {
        const { rawLog, incidentType, contextNotes } = req.body || {};
        if (rawLog && typeof rawLog === "string") {
          const fallbackData = generateHeuristicAnalysis(rawLog, incidentType, contextNotes);
          return res.json({
            success: true,
            analysis: fallbackData,
            analyzedAt: new Date().toISOString(),
            isFallback: true,
          });
        }
      } catch (innerErr) {
        // Ignore inner error
      }

      return res.status(500).json({
        error: "Failed to perform AI security analysis",
        details: err?.message || String(err),
      });
    }
  });

  // Live Cybersecurity Insights Endpoint using Google Search Grounding
  app.get("/api/cybersecurity-insights", async (req, res) => {
    try {
      const topic = (req.query.topic as string) || "recent zero day vulnerabilities critical cybersecurity incidents SOC threat hunting news";
      const ai = getGeminiClient();

      const fallbackInsights = [
        {
          id: "ins-1",
          title: "Active Exploitation of Zero-Day Buffer Overflow in Enterprise VPN Gateways",
          category: "ZERO-DAY ADVISORY",
          severity: "CRITICAL",
          publishedDate: "Recent Advisory",
          sourceTitle: "CISA & Cyber Threat Intelligence",
          sourceUrl: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
          summary: "Threat actors are actively leveraging an unauthenticated remote code execution vulnerability in edge perimeter SSL-VPN appliances to breach corporate internal subnets.",
          keyTakeaways: [
            "Immediate patching recommended for exposed SSL-VPN firmware releases.",
            "Enforce strict IP access control lists (ACLs) and MFA on administrative management interfaces.",
            "Audit perimeter traffic for anomalous outbound TCP session connections to rogue IPs."
          ],
          analystCommentary: "Perimeter VPNs remain the #1 initial access vector for ransomware operators. SOC teams must immediately verify perimeter asset inventories and apply virtual patching via WAF/IPS where direct firmware updates are pending."
        },
        {
          id: "ins-2",
          title: "Rise in Encoded PowerShell & Living-off-the-Land (LotL) Attacks",
          category: "SOC TELEMETRY",
          severity: "HIGH",
          publishedDate: "Threat Triage Note",
          sourceTitle: "BleepingComputer / Threat Research",
          sourceUrl: "https://www.bleepingcomputer.com/",
          summary: "Adversaries are increasingly bypassing traditional antivirus by utilizing native Windows binaries (certutil, powershell, wmic) with obfuscated base64 payload strings.",
          keyTakeaways: [
            "Enable Sysmon Event ID 1 (Process Creation) with command-line logging enabled.",
            "Deploy YARA rules targeting encoded commands spawning from Office applications.",
            "Enforce PowerShell Constrained Language Mode (CLM) across non-admin workstations."
          ],
          analystCommentary: "LotL techniques neutralize signature-based antivirus. Defense requires behavior-based EDR telemetry looking for anomalous parent-child process chains like winword.exe spawning powershell.exe."
        },
        {
          id: "ins-3",
          title: "Cloud Infrastructure Identity Privilege Escalation via Misconfigured IAM Roles",
          category: "CLOUD DEFENSE",
          severity: "HIGH",
          publishedDate: "Cloud Security Digest",
          sourceTitle: "Dark Reading / Cloud Security",
          sourceUrl: "https://www.darkreading.com/cloud-security",
          summary: "Security researchers identified widespread IAM role trust policy misconfigurations allowing cross-account lateral movement in multi-tenant cloud environments.",
          keyTakeaways: [
            "Audit IAM assume-role policies for wildcards (*) in Principal fields.",
            "Implement automated CloudTrail / Audit Log anomaly detection for unexpected role assume events.",
            "Adopt Least Privilege principles and ephemeral credential tokens."
          ],
          analystCommentary: "Identity is the new perimeter in multi-cloud architectures. SOC monitoring must treat unexpected IAM assume-role spikes as equivalent to perimeter network intrusion."
        }
      ];

      if (!ai) {
        return res.json({
          success: true,
          insights: fallbackInsights,
          sources: [],
          isFallback: true,
          timestamp: new Date().toISOString()
        });
      }

      const systemInstruction = `You are Senior Security Researcher Ujjwal Tamang (CEH v12 & SOC Analyst).
You gather real-time cybersecurity news and threat intelligence using Google Search Grounding.
Find the latest, most critical cybersecurity incidents, zero-day CVEs, ransomware trends, or SOC threat hunting news.
Provide a clean JSON response containing 3-4 structured insight objects.`;

      const prompt = `Search for the latest critical cybersecurity news, zero-day advisories, and threat intelligence updates.
Query topic: ${topic}.

Return a JSON array of 3 to 4 objects with the following schema:
[
  {
    "id": "ins-1",
    "title": "Title of security news or advisory",
    "category": "ZERO-DAY ADVISORY",
    "severity": "CRITICAL",
    "publishedDate": "Date or recent timeframe",
    "sourceTitle": "Publisher or News Source Name",
    "sourceUrl": "URL if available",
    "summary": "2-3 sentence executive summary of the threat",
    "keyTakeaways": ["Takeaway 1", "Takeaway 2", "Takeaway 3"],
    "analystCommentary": "Ujjwal Tamang's SOC analyst opinion on how defense teams should handle this threat"
  }
]`;

      let response;
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: prompt,
          config: {
            systemInstruction,
            tools: [{ googleSearch: {} }],
          },
        });
      } catch (geminiErr: any) {
        console.warn("Gemini search grounding call failed, returning fallback insights:", geminiErr?.message || geminiErr);
        return res.json({
          success: true,
          insights: fallbackInsights,
          sources: [],
          isFallback: true,
          timestamp: new Date().toISOString()
        });
      }

      const textOutput = response.text || "";
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      const sources = groundingChunks.map((chunk: any) => ({
        title: chunk.web?.title || "Web Source",
        url: chunk.web?.uri || "#"
      })).filter((s: any) => s.url !== "#");

      let parsedInsights = [];
      try {
        const jsonMatch = textOutput.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (jsonMatch) {
          parsedInsights = JSON.parse(jsonMatch[0]);
        } else {
          parsedInsights = JSON.parse(textOutput);
        }
      } catch (parseErr) {
        console.warn("Could not parse JSON from Gemini search response, using fallback.");
      }

      if (!Array.isArray(parsedInsights) || parsedInsights.length === 0) {
        parsedInsights = fallbackInsights;
      }

      return res.json({
        success: true,
        insights: parsedInsights,
        sources,
        isFallback: false,
        timestamp: new Date().toISOString()
      });

    } catch (err: any) {
      console.error("Cybersecurity insights endpoint error:", err);
      return res.status(500).json({
        error: "Failed to fetch cybersecurity insights",
        details: err?.message || String(err)
      });
    }
  });

  // Vite middleware for dev / static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Ujjwal Tamang SOC App] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
