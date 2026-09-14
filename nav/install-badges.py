import os, shutil

NAV = '/home/ubuntu/gta7/.claude/worktrees/gta7-vehicles-wiki/nav'
ROOT = '/home/ubuntu/gta7'
done = []
for name in os.listdir(os.path.join(NAV, 'badges')):
    rel = name.replace('__', '/')
    shutil.copyfile(os.path.join(NAV, 'badges', name), os.path.join(ROOT, rel))
    done.append(rel)
with open(os.path.join(ROOT, 'app/archive-refresh.css'), 'a') as f:
    f.write(open(os.path.join(NAV, 'badges.css')).read())
shutil.copyfile(os.path.join(NAV, 'tailwind.config.js'), os.path.join(ROOT, 'tailwind.config.js'))
shutil.copyfile(os.path.join(NAV, 'publicar.sh'), os.path.join(ROOT, 'publicar.sh'))
os.chmod(os.path.join(ROOT, 'publicar.sh'), 0o755)
gi = os.path.join(ROOT, '.gitignore')
text = open(gi).read()
extra = [x for x in ['.publicar.lock', '.publicar-build.log'] if x not in text]
if extra:
    with open(gi, 'a') as f:
        f.write('\n# publicar.sh\n' + '\n'.join(extra) + '\n')
print(len(done), 'files ·', 'gitignore +' + ','.join(extra) if extra else 'gitignore ok')
