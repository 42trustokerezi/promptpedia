import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// read
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const awaitParams = await params;
    const prompt = await Prompt.findById(awaitParams.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

// update

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    // update the promt and tag properties
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    // save the prompt
    await existingPrompt.save();
    return new Response("Successfully updated the prompts", { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

// delete
export const DELETE = async (request, { params })=> {
    try {
        await connectToDB();

        const awaitParams = await params
        await Prompt.findByIdAndRemove(awaitParams.id);

        return new Response("Prompt deleted successfully", { status: 200 })
    }catch (error) {
        return new Response("Failed to delete the prompt", { status: 500 });
    }
}