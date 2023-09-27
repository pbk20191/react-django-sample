from os.path import join
import os, asyncio, venv

async def setup_python():
    dir = join(os.getcwd(), ".venv")
    if os.name == 'nt':
        await asyncio.to_thread(lambda: venv.create(".venv", with_pip=True))
    else:
        venv_process = await asyncio.create_subprocess_exec("python3", "-m", "venv", ".venv", cwd=os.getcwd())
        await venv_process.wait()
    if os.name == 'nt':
        process = await asyncio.create_subprocess_shell(
            executable="C:\\Windows\\system32\\cmd.exe",
            cmd=".\\.venv\\Scripts\\activate.bat /d /c",
            cwd=os.getcwd()
        )
        await process
    else:
        process = await asyncio.create_subprocess_shell(cmd="source .venv/bin/activate", cwd=os.curdir)
        await process.wait()
    python_command = join(".venv", "bin", "python3")
    if os.name == 'nt':
        python_command = join(".venv", "Scripts", "python.exe")
    process = await asyncio.create_subprocess_exec(python_command, *["-m", "pip", "install", "-r", "requirements.txt"], cwd=os.getcwd())
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