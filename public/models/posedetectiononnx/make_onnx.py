# https://github.com/onnx/onnx/blob/main/docs/PythonAPIOverview.md
import numpy as np
import onnx
import torch


class PreNet(torch.nn.Module):

    def __init__(self):
        super(PreNet, self).__init__()
    def forward(self, x):
        return torch.permute(x, (0, 2, 3, 1))

if __name__ == "__main__":

    # 전 후처리 만들기
    prenet = PreNet()
    # postnet = PostNet()

    device = torch.device("cuda")
    prenet.to(device)
    # postnet.to(device)

    pre_tensor = torch.as_tensor(np.zeros(shape = (1, 3, 256, 256)), device=device, dtype=torch.int32)  # float32형으로 바꾸기
    # post_tensor = torch.as_tensor(np.zeros(shape = (1, 212)), device=device, dtype=torch.float32)  # float32형으로 바꾸기

    torch.onnx.export(prenet,                     # model being run
                      pre_tensor,                         # model input (or a tuple for multiple inputs)
                      "pre.onnx",   # where to save the model (can be a file or file-like object)
                      export_params=True,        # store the trained parameter weights inside the model file
                      opset_version=11,          # the ONNX version to export the model to /
                      do_constant_folding=True,  # whether to execute constant folding for optimization
                      input_names=['input'],  # the model's input names
                      output_names=['output'])  # the model's output names

    model1 = onnx.load("pre.onnx")
    model2 = onnx.load("modelorigin.onnx")

    model1 = onnx.compose.add_prefix(model1, prefix="pre/")
    combined_model1 = onnx.compose.merge_models(
        model1, model2,
        io_map=[("pre/output", "input")],
    )
    onnx.checker.check_model(combined_model1)
    onnx.save(combined_model1, "model.onnx")


