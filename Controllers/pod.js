const express = require('express');
const router = express.Router();

const k8s = require('@kubernetes/client-node');
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
// Create a Kubernetes client
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const path = k8sApi.basePath = "http://localhost:3000/pods";

// Define the Pod manifest
const podManifest = {
    apiVersion: 'v1',
    kind: 'Pod',
    metadata: {
        name: 'my-pod',
    },
    spec: {
        containers: [
            {
                name: 'my-container',
                image: 'nginx',
            },
        ],
    },
};

// 
// Get all Pods
router.get('/pods', (req, res) => {
    
    k8sApi.listNamespacedPod('default')
        .then((response) => {
            res.json(response.body.items);
        })
        .catch((err) => {
            console.error('Error getting Pods:', err);
            res.status(500).json({ error: 'Failed to get Pods' });
        });
});

// Get a specific Pod by name
router.get('/pods/:name', (req, res) => {
    const podName = req.params.name;
    k8sApi.readNamespacedPod(podName, 'default')
        .then((response) => {
            res.json(response.body);
        })
        .catch((err) => {
            console.error('Error getting Pod:', err);
            res.status(500).json({ error: 'Failed to get Pod' });
        });
});

// Delete a Pod by name
// send a leave command?
router.delete('/pods/:name', (req, res) => {
    const podName = req.params.name;
    k8sApi.deleteNamespacedPod(podName, 'default')
        .then(() => {
            res.json({ message: 'Pod deleted successfully' });
        })
        .catch((err) => {
            console.error('Error deleting Pod:', err);
            res.status(500).json({ error: 'Failed to delete Pod' });
        });
});

// Update a Pod by name
router.put('/pods/:name', (req, res) => {
    const podName = req.params.name;
    const updatedPodManifest = {
        apiVersion: 'v1',
        kind: 'Pod',
        metadata: {
            name: podName,
        },
        spec: {
            containers: [
                {
                    name: 'my-container',
                    image: 'nginx:latest',
                },
            ],
        },
    };

    k8sApi.replaceNamespacedPod(podName, 'default', updatedPodManifest)
        .then(() => {
            res.json({ message: 'Pod updated successfully' });
        })
        .catch((err) => {
            console.error('Error updating Pod:', err);
            res.status(500).json({ error: 'Failed to update Pod' });
        });
});

// Scale a Pod by name
router.post('/pods/:name/scale', (req, res) => {
    const podName = req.params.name;
    const replicas = req.body.replicas;

    const scaleManifest = {
        apiVersion: 'autoscaling/v1',
        kind: 'Scale',
        metadata: {
            name: podName,
            namespace: 'default',
        },
        spec: {
            replicas: replicas,
        },
    };

    k8sApi.replaceNamespacedScale(podName, 'default', scaleManifest)
        .then(() => {
            res.json({ message: 'Pod scaled successfully' });
        })
        .catch((err) => {
            console.error('Error scaling Pod:', err);
            res.status(500).json({ error: 'Failed to scale Pod' });
        });
});

// Create the Pod
router.post('/pods', (req, res) => {
    k8sApi.createNamespacedPod('default', podManifest)
        .then((response) => {
            res.json(response.body.metadata.name);
        })
        .catch((err) => {
            console.error('Error creating Pod:', err);
        });

});


module.exports = router