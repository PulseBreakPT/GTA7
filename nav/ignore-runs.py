import os
path = '/home/ubuntu/gta7/.git' + 'ignore'
text = open(path).read()
if '/macaco/runs/' not in text:
    with open(path, 'a') as f:
        f.write('\n# Macaco QA runs (screenshots, traces, videos)\n/macaco/runs/\n')
print('/macaco/runs/' in open(path).read())
print('local-bin-in-path', '/home/ubuntu/.local/bin' in os.environ.get('PATH', '').split(':'), os.path.isdir('/home/ubuntu/.local/bin'))
