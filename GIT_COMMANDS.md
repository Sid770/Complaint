# Git Commands Cheat Sheet

## 📝 Initial Setup (First Time Only)

```bash
# Navigate to your project directory
cd "b:\OneDrive - Amity University\Desktop\CRUD"

# Initialize git repository (if not already done)
git init

# Configure your identity
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add your remote repository
git remote add origin https://github.com/Sid770/Complaint.git
```

## 🚀 Push Changes to GitHub

### Option 1: First Push (New Repository)

```bash
# Add all files to staging
git add .

# Commit changes
git commit -m "Initial commit: Add Complaint Tracking Portal with CI/CD"

# Push to GitHub (first time)
git push -u origin main
```

### Option 2: Subsequent Pushes

```bash
# Check status
git status

# Add specific files
git add .github/workflows/
git add ComplaintApi/
git add hcl4/

# Or add all changes
git add .

# Commit with message
git commit -m "Add SQLite database and CI/CD pipeline"

# Push to GitHub
git push
```

## 🔄 Update Existing Repository

```bash
# Pull latest changes first
git pull origin main

# Make your changes, then add them
git add .

# Commit
git commit -m "Update: Add Docker configuration"

# Push
git push origin main
```

## 🌿 Working with Branches

```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# List all branches
git branch -a

# Merge branch to main
git checkout main
git merge feature/new-feature

# Delete branch
git branch -d feature/new-feature
```

## 📦 Common Scenarios

### Scenario 1: Add New Files

```bash
git add .
git commit -m "Add new component"
git push
```

### Scenario 2: Update Existing Files

```bash
git add path/to/file
git commit -m "Update file with new logic"
git push
```

### Scenario 3: Delete Files

```bash
git rm file-to-delete.txt
git commit -m "Remove unused file"
git push
```

### Scenario 4: Undo Last Commit (Not Pushed)

```bash
git reset --soft HEAD~1
```

### Scenario 5: Discard Local Changes

```bash
# Discard changes in specific file
git checkout -- filename

# Discard all changes
git reset --hard HEAD
```

## 🔍 Checking Status

```bash
# View status
git status

# View commit history
git log

# View recent commits (one line each)
git log --oneline -10

# View changes in files
git diff
```

## 🏷️ Tagging Releases

```bash
# Create tag
git tag -a v1.0.0 -m "Version 1.0.0"

# Push tag
git push origin v1.0.0

# Push all tags
git push --tags

# List tags
git tag -l
```

## 🚨 Git Ignore

Create `.gitignore` file to exclude files:

```bash
# For root directory
cat > .gitignore << 'EOF'
# Node modules
node_modules/
npm-debug.log

# Build outputs
dist/
.angular/

# IDE
.vscode/
.vs/

# Environment files
.env
.env.local

# Database
*.db
*.db-shm
*.db-wal

# Logs
*.log
EOF
```

## 🎯 Quick Reference

| Command | Description |
|---------|-------------|
| `git status` | Check current status |
| `git add .` | Stage all changes |
| `git commit -m "message"` | Commit with message |
| `git push` | Push to remote |
| `git pull` | Pull from remote |
| `git clone <url>` | Clone repository |
| `git branch` | List branches |
| `git checkout <branch>` | Switch branch |
| `git log` | View history |
| `git diff` | View changes |

## 💡 Tips

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Use descriptive commit messages
3. **Pull Before Push**: Always pull latest changes first
4. **Use Branches**: Create branches for new features
5. **Review Changes**: Check `git status` and `git diff` before committing

## 🆘 Emergency Commands

### Undo Last Push (Dangerous!)

```bash
# Reset to previous commit
git reset --hard HEAD~1

# Force push (only if you're sure!)
git push -f origin main
```

### Reset to Remote State

```bash
git fetch origin
git reset --hard origin/main
```

### Clean Untracked Files

```bash
# Dry run (see what will be deleted)
git clean -n

# Actually delete
git clean -fd
```

## 📞 Need Help?

```bash
# Get help for any command
git help <command>
git <command> --help

# Examples:
git help commit
git push --help
```

---

## 🎯 Recommended Workflow for This Project

```bash
# 1. Check status
git status

# 2. Add changes
git add .

# 3. Commit with descriptive message
git commit -m "Add CI/CD pipeline and SQLite integration"

# 4. Pull latest changes (avoid conflicts)
git pull origin main --rebase

# 5. Push to GitHub
git push origin main

# 6. Check GitHub Actions
# Visit: https://github.com/Sid770/Complaint/actions
```

**That's it! Your CI/CD pipeline will automatically run on push.** 🚀
