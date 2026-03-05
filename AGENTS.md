# AGENTS.md

## Build, Lint, and Test Commands

### Development Workflow
- **Build**: 
  - Run `python -m pip install -e .` to install the package in development mode.
  - Use `python app.py` to start the main application server.
  
- **Linting**:
  - Run `flake8 . --max-line-length 100 --ignore=E203,W503` to check code style and potential issues.
  - Run `black --line-length 100 --target-version py38 .` to automatically format the code.
  
- **Testing**:
  - Run `python -m pytest tests/` to execute all tests.
  - To run a single test file:
    ```bash
    python -m pytest tests/test_file.py -v
    ```
  - To run a single test function within a test file:
    ```bash
    python -m pytest tests/test_file.py::test_function_name -v
    ```

### Scripts
- `"scripts/":` Directory containing utility scripts for common tasks
- `run_dev.py:` Development server script with auto-reload
- `generate_requirements.py:` Script to generate requirements.txt

## Code Style Guidelines

### Import Conventions
1. **Group Imports**:
   - Standard library imports (e.g., `import os`, `import sys`)
   - Related third-party imports (e.g., `import pytest`, `import numpy as np`)
   - Local application imports (e.g., `from utils.api import get_data`)
   
2. **Sorting**:
   - Sort imports alphabetically within each group
   - Use blank lines between different import groups

3. **Formatting**:
   - Use absolute imports instead of relative imports
   - End each import statement on its own line

### Formatting and Structure
1. **Line Length**:
   - Limit line length to 100 characters
   - Wrap lines at appropriate intervals for readability

2. **Blank Lines**:
   - Use blank lines between logical sections of code
   - Add blank lines before and after comments

3. **Indentation**:
   - Use 4 spaces for indentation (not tabs)
   - Maintain consistent indentation levels throughout the file

### Type Hints and Annotations
1. **Type Hints**:
   - Use explicit type hints for all function parameters and return values
   - Use `Optional[]` for potentially null values
   - Use `List[]`, `Dict[]`, etc. for complex data structures

2. **Runtime Types**:
   - Add type checking annotations where appropriate
   - Use `mypy` for static type checking

### Naming Conventions
1. **Classes and Methods**:
   - Use PascalCase for class names (`UserManager`, `DataProcessor`)
   - Use snake_case for method names (`calculate_total`, `process_data`)
   - Use descriptive names that clearly indicate purpose

2. **Variables and Constants**:
   - Use lowercase_with_underscores for variables (`user_count`, `max_connections`)
   - Use uppercase_with_underscores for constants (`MAX_USERS`, `DEFAULT_TIMEOUT`)
   - Use meaningful names that reflect the data they represent

3. **Files and Directories**:
   - Use lowercase with hyphens or underscores for file names (`user-auth.js`, `data-processor.py`)
   - Group related files in appropriate directories

### Error Handling
1. **Exception Management**:
   - Catch specific exceptions rather than broad exceptions (`except ValueError:` instead of `except Exception:`)
   - Include descriptive error messages in exception handlers
   - Log errors with appropriate context information

2. **Resource Cleanup**:
   - Always close resources such as file handles and network connections
   - Use context managers (`with` statements) when working with files and network connections

3. **Error Propagation**:
   - Allow critical errors to propagate when appropriate
   - Catch and re-raise exceptions when additional context is needed

### Documentation Standards
1. **Docstrings**:
   - Use Google style or NumPy style docstrings for all public functions and classes
   - Include parameter descriptions and return value documentation
   - Document edge cases and potential exceptions

2. **Code Comments**:
   - Add comments for complex logic that isn't immediately obvious
   - Explain the "why" rather than the "what"
   - Remove outdated or incorrect comments

### Testing Practices
1. **Test Structure**:
   - Arrange tests in a similar structure to the codebase
   - Use descriptive test names that indicate the scenario being tested

2. **Test Coverage**:
   - Aim for high coverage of critical paths
   - Include tests for edge cases and error conditions

3. **Test Data**:
   - Use synthetic or mock data to isolate test cases
   - Avoid using real user data in tests

## Project-Specific Guidelines

### Authentication
- Implement secure authentication flows
- Use environment variables for sensitive information
- Never hardcode credentials or API keys

### Data Persistence
- Encrypt all user chats at rest
- Store chat history in JSON format in `state.json`
- Implement proper access controls for admin functionality

### Model Management
- Support multiple provider types (local, omelette, openai-compatible, anthropic, google)
- Implement rank-based access control and quotas
- Allow presets for common generation configurations

## References

- [Requirements](../requirements.txt)
- [Configuration](../CONFIGURATION.md)
- [Repository Map](../REPO_MAP.md)
- [Installation Instructions](../INSTRUCTIONS.md)