# AI CLI Agent
This project provides a command-line AI assistant that helps you execute tasks by breaking them down into steps, generating shell commands and Python scripts using a free model from OpenRouter.

---

## Features
-Accepts a user-defined task in natural language.

-Uses an AI model to:

    -Break the task into step-by-step instructions.

    -Suggest shell commands (prefixed with $).

    -Provide Python code blocks.

-Lets you:

    -Review the AI-generated plan before execution.

    -Execute shell commands automatically.

    -Save Python scripts to a file and optionally run them.

-Allows iterative feedback to improve the plan if it fails.

---

## Requirements
Python 3.8+

Dependencies:
``` bash
pip install requests rich
```
---

## Setup
### 1.Clone the repository (or copy ai_agent_free.py).

### 2.Get a free API key from OpenRouter.

### 3.Edit the script and add your API key:
``` python
    OPENROUTER_API_KEY = "your_api_key_here"
```

---

## Usage
Run the agent from the terminal:
``` bash 
python ai_agent_free.py
```

### How it works

#### 1.You will be asked:
```
🎯 What do you want me to do?
> 

```
#### Example
```
> Create a Python script that scrapes example.com and saves titles in a CSV.

```
### 2.The AI will generate a plan with commands and code.

### 3. You can:

        -Approve or cancel the plan.

        -Save code to a file and optionally run it.

### 4. If something fails, provide feedback and the AI will improve the plan.

---

### Example Session
```
🎯 What do you want me to do?
> Create a Python script that prints "Hello, World!"

🤖 AI PLAN:
1. Write a Python script:
```python
print("Hello, World!")
```

Do you want to run this plan? (y/n): y
📁 Save this code to file (e.g., script.py): hello.py
Run the script now? (y/n): y
✅ Output:
Hello, World!
✅ Was the task completed successfully? (y/n): y
🎉 Done!
```

---

## **Model**
- **Default model:** `mistralai/mistral-7b-instruct` (Free tier on OpenRouter)

You can change it by editing:
```python
MODEL = "mistralai/mistral-7b-instruct"
```

---

### Limitations
-Requires internet access for API calls.

-Only works with models available on OpenRouter.

-No direct sandboxing for shell commands—use with caution.

---

### Planned Enhancements
-Add model selection at runtime.

-Support automatic script execution without prompts.

-Improve error handling and rollback for shell commands.


