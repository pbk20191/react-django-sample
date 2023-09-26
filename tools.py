from os.path import join
import os, asyncio

async def setup_python():
    dir = join(os.curdir, ".venv")
    python_command = "python3"
    if os.name == 'nt':
        python_command = 'py'
    venv_process = await asyncio.create_subprocess_exec(python_command, "-m", "venv", ".venv", cwd=os.curdir)
    await venv_process.wait()
    if os.name == 'nt':
        process = await asyncio.create_subprocess_exec(program=".venv\\Scripts\\activate.bat", cwd=os.curdir)
        await process
    else:
        process = await asyncio.create_subprocess_shell(cmd="source .venv/bin/activate", cwd=os.curdir)
        await process.wait()
    process = await asyncio.create_subprocess_exec(".venv/bin/" + python_command, *["-m", "pip", "install", "-r", "requirements.txt"], cwd=os.curdir)
    await process.wait()

async def setup_node():
    process = await asyncio.create_subprocess_exec("npm", "install", cwd=join(os.curdir, "client"))
    await process.wait()

async def setup_all():
    async with asyncio.TaskGroup() as group:
        group.create_task(setup_node())
        group.create_task(setup_python())

if __name__ == '__main__':
    asyncio.run(setup_all())