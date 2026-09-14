import os, shutil
NAV = '/home/ubuntu/gta7/.claude/worktrees/gta7-vehicles-wiki/nav'
ROOT = '/home/ubuntu/gta7'
done = []
for name in os.listdir(os.path.join(NAV, 'fix5')):
    rel = name.replace('__', '/')
    dest = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    shutil.copyfile(os.path.join(NAV, 'fix5', name), dest)
    done.append(rel)
with open(os.path.join(ROOT, 'app/archive-refresh.css'), 'a') as f:
    f.write(open(os.path.join(NAV, 'fix5.css')).read())
print(len(done), 'files')
for d in sorted(done): print(' ', d)
