const projectService = require('../services/projects.services');
const awsConfig = require('../config/aws.config');

async function getAll(req, res, next) {
    try {
        const projects = await projectService.getAll();
        res.status(200).json({
            message: 'success',
            data: projects
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function get(req, res, next) {
    try {
        const { id } = req.params;
        const projects = await projectService.findOne(id);
        res.status(200).json({
            message: 'success',
            data: projects
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function add(req, res, next) {
    try {
        const data = req.body;
        const { equipments, ...projectData } = data;
        const project = await projectService.add(projectData);
        if (project && equipments?.length) {
            const projectEquipments = equipments.map((e) => {
                return {
                    proj_id: project.proj_id,
                    equip_id: e.equip_id
                }
            })
            console.log(projectEquipments);
            await projectService.addProjectEquipments(projectEquipments);
        }
        res.status(200).json({
            message: 'success',
            data: project
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function update(req, res, next) {
    try {
        const data = req.body;
        const { id, equipments, ...dataToUpdate } = data;
        await projectService.update(id, dataToUpdate);
        if (equipments?.length) {
            const projectEquipments = equipments.map((e) => ({
                proj_id: parseInt(id),
                equip_id: e.equip_id
            }));
            await projectService.updateProjectEquipments(id,projectEquipments);
        }
        res.status(200).json({
            message: 'success',
            data: {}
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function findOne(req, res, next) { }

async function deleteProject(req, res, next) { }

async function addTask(req, res, next) {
    try {
        const data = req.body;
        const task = await projectService.addTask(data);
        res.status(200).json({
            data: task,
            message: 'success'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function addSubTask(req, res, next) {
    try {
        const data = req.body;
        const task = await projectService.addSubTask(data);
        res.status(200).json({
            data: task,
            message: 'success'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function projectsWithTaskAndSubtasks(req, res, next) {
    try {
        const { projectId } = req.params;
        console.log(req.params)
        const projectTask = await projectService.projectTaskWithSubTask(projectId);
        res.status(200).json({
            data: projectTask,
            message: 'success'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function getFile(req,res,next) {
    const { fileKey } = req.params;
    try {
      const result = await  awsConfig.downloadFileFrmoS3(fileKey);
       res.send(result.Body);
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function addFile(req, res, next) {
    try {
        const { id , identifier } = req.body;
        const response = await awsConfig.uploadToS3(req.file);
        if(response?.Location){
            await projectService.addFiles(identifier,id,response?.Location)
        }
        res.status(200).json({
            data: response,
            message: 'success'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function deleteFile(req, res, next) {
    try {
        const { fileId } = req.params;
        await projectService.deleteFile(fileId);
        res.status(200).json({ message: 'success' });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

async function getTaskSubTaskFiles(req, res, next) {
    try {
        const { id, identifier } = req.body;
        let result;
        if (identifier == 'task') {
            result = await projectService.getTaskFiles(id)
        }
        else {
            result = await projectService.getSubTaskFiles(id)
        }
        res.status(200).json({
            data : result
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: error
        });
    }
}

module.exports = {
    getAll,
    add,
    update,
    findOne,
    deleteProject,
    addTask,
    addSubTask,
    projectsWithTaskAndSubtasks,
    get,
    addFile,
    getFile,
    deleteFile,
    getTaskSubTaskFiles
}